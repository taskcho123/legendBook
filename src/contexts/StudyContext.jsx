import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import socket from "../ws/socket";

export const StudyContext = createContext();

export function StudyProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [isStudying, setIsStudying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [participants, setParticipants] = useState([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    socket.connect();
    socket.on("participants:update", (list) => {
      setParticipants(list);
    });
    return () => {
      socket.off("participants:update");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isStudying) {
      startTimeRef.current = Date.now() - elapsed * 1000;
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
      // notify server
      socket.emit("study:start", { userId: user?.id, name: user?.name });
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isStudying]);

  useEffect(() => {
    // 주기적으로 서버에 공부시간 전송
    if (user) {
      socket.emit("study:update", { userId: user.id, elapsed });
    }
  }, [elapsed, user]);

  const startStudy = () => {
    setIsStudying(true);
    setElapsed(0);
  };

  const stopStudy = () => {
    setIsStudying(false);
    socket.emit("study:stop", { userId: user?.id, elapsed });
  };

  return (
    <StudyContext.Provider
      value={{ isStudying, startStudy, stopStudy, elapsed, participants }}
    >
      {children}
    </StudyContext.Provider>
  );
}
