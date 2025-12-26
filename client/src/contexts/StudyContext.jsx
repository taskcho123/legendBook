import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { fetchAPI } from "../utils/api";

export const StudyContext = createContext();

export function StudyProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [isStudying, setIsStudying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [participants, setParticipants] = useState([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastSyncRef = useRef(0);
  const lastTotalsRef = useRef(new Map());
  const lastChangeRef = useRef(new Map());

  // 초기 사용자 공부시간 불러오기
  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!user) {
        setElapsed(0);
        return;
      }
      const res = await fetchAPI(`/api/studytime/${user.id}`);
      if (mounted && res && typeof res.totalSeconds === "number") {
        setElapsed(res.totalSeconds);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  // 전체 순위 주기적 polling
  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      const data = await fetchAPI("/api/studytime/all");
      if (!cancelled && Array.isArray(data)) {
        const now = Date.now();
        const sorted = [...data].sort((a, b) => b.totalSeconds - a.totalSeconds);
        const withPaused = sorted.map((p) => {
          const prevTotal = lastTotalsRef.current.get(p.userId);
          if (prevTotal === undefined || p.totalSeconds > prevTotal) {
            lastTotalsRef.current.set(p.userId, p.totalSeconds);
            lastChangeRef.current.set(p.userId, now);
            return { ...p, paused: false };
          }
          const lastChange = lastChangeRef.current.get(p.userId) || now;
          const pausedByStall = now - lastChange > 2000;
          // pause override for 현재 사용자
          const isSelf = user && p.userId === user.id;
          const paused = isSelf ? !isStudying : pausedByStall;
          return { ...p, paused };
        });
        setParticipants(withPaused);
      }
    };
    poll();
    const id = setInterval(poll, 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [isStudying, user]);

  // 타이머 동작
  useEffect(() => {
    if (isStudying) {
      startTimeRef.current = Date.now() - elapsed * 1000;
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isStudying]);

  // 서버에 공부시간 주기적 동기화
  useEffect(() => {
    const sync = async () => {
      if (!user) return;
      const now = Date.now();
      if (isStudying && now - lastSyncRef.current < 1000) return;
      lastSyncRef.current = now;
      await fetchAPI("/api/studytime/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, name: user.name, totalSeconds: elapsed }),
      });
    };
    sync();
  }, [elapsed, user, isStudying]);

  const startStudy = () => {
    if (!user) return;
    setIsStudying(true);
  };

  const stopStudy = () => {
    setIsStudying(false);
  };

  // 사용자 변경 시 타이머 초기화
  useEffect(() => {
    if (!user) {
      setIsStudying(false);
      setElapsed(0);
    }
  }, [user]);

  return (
    <StudyContext.Provider
      value={{ isStudying, startStudy, stopStudy, elapsed, participants }}
    >
      {children}
    </StudyContext.Provider>
  );
}
