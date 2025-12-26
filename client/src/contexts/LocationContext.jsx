import React, { createContext, useEffect, useState, useContext, useRef } from "react";
import { haversineDistance } from "../utils/geo";
import { AuthContext } from "./AuthContext";
import { StudyContext } from "./StudyContext";
import { fetchAPI } from "../utils/api";

export const LocationContext = createContext();

// 기준 위치: 서울특별시 광진구 능동로 120 (건국대 근처)
const TARGET_LAT = 37.5408;
const TARGET_LNG = 127.0745;
const OUTSIDE_DISTANCE_M = 150;
const OUTSIDE_LIMIT_MS = 90 * 60 * 1000; // 90분

export function LocationProvider({ children }) {
  const [lastPosition, setLastPosition] = useState(null);
  const [isOutside, setIsOutside] = useState(false);
  const [outsideStart, setOutsideStart] = useState(null);
  const [distance, setDistance] = useState(null);
  const [hasForcedCancel, setHasForcedCancel] = useState(false);
  const { user } = useContext(AuthContext);
  const { isStudying, stopStudy } = useContext(StudyContext);
  const watcherRef = useRef(null);

  // 위치 추적
  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    const handlePosition = (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setLastPosition({ lat, lng });
      const dist = haversineDistance(lat, lng, TARGET_LAT, TARGET_LNG);
      setDistance(dist);
      const outside = dist > OUTSIDE_DISTANCE_M;

      if (outside && !isOutside) {
        setIsOutside(true);
        setOutsideStart(Date.now());
        setHasForcedCancel(false);
      } else if (!outside && isOutside) {
        setIsOutside(false);
        setOutsideStart(null);
        setHasForcedCancel(false);
      }
    };

    const handleError = (err) => {
      console.warn("geolocation error", err);
    };

    watcherRef.current = navigator.geolocation.watchPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      maximumAge: 10_000,
      timeout: 20_000,
    });

    return () => {
      if (watcherRef.current !== null) navigator.geolocation.clearWatch(watcherRef.current);
    };
  }, [isOutside]);

  // 1초 간격 체크: 90분 초과 시 강제 예약 취소 + 공부 정지
  useEffect(() => {
    const id = setInterval(async () => {
      if (!user) return;
      if (!isOutside || !outsideStart || hasForcedCancel) return;
      const elapsed = Date.now() - outsideStart;
      if (elapsed < OUTSIDE_LIMIT_MS) return;

      try {
        await fetchAPI(`/api/reservations/${user.id}`, { method: "DELETE" });
      } catch (e) {
        console.error("force cancel reservation failed", e);
      }

      if (isStudying) stopStudy();
      setHasForcedCancel(true);
    }, 1000);

    return () => clearInterval(id);
  }, [user, isOutside, outsideStart, hasForcedCancel, isStudying, stopStudy]);

  // 유저 변경 시 상태 초기화
  useEffect(() => {
    setIsOutside(false);
    setOutsideStart(null);
    setHasForcedCancel(false);
    setDistance(null);
  }, [user]);

  return (
    <LocationContext.Provider
      value={{
        lastPosition,
        isOutside,
        outsideStart,
        distance,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
