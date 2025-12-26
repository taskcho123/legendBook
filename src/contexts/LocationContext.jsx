import React, { createContext, useEffect, useState, useContext } from "react";
import { haversineDistance } from "../utils/geo";
import { AuthContext } from "./AuthContext";
import { fetchAPI } from "../utils/api";

export const LocationContext = createContext();

const DEFAULT_LIBRARY = { lat: 37.5665, lng: 126.9780 }; // 예: 서울 시청 근처, 환경에 맞게 변경
const AUTO_RETURN_DISTANCE_M = 500;

export function LocationProvider({ children, library = DEFAULT_LIBRARY }) {
  const [lastPosition, setLastPosition] = useState(null);
  const [withinLibrary, setWithinLibrary] = useState(false);
  const [autoReturned, setAutoReturned] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    const id = navigator.geolocation.watchPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLastPosition({ lat, lng });
        const distance = haversineDistance(lat, lng, library.lat, library.lng);
        const close = distance <= AUTO_RETURN_DISTANCE_M;
        setWithinLibrary(close);

        if (close && user && !autoReturned) {
          // 자동 반납 호출
          try {
            const res = await fetchAPI("/api/seats/return", {
              method: "POST",
              body: JSON.stringify({ userId: user.id }),
              headers: { "Content-Type": "application/json" },
            });
            if (res?.ok || res?.success) {
              setAutoReturned(true);
            }
          } catch (e) {
            console.error("auto return failed", e);
          }
        }
      },
      (err) => {
        console.warn("geolocation error", err);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [library, user, autoReturned]);

  return (
    <LocationContext.Provider
      value={{ lastPosition, withinLibrary, autoReturned, setAutoReturned }}
    >
      {children}
    </LocationContext.Provider>
  );
}
