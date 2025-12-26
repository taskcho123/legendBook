import React, { createContext, useState } from "react";
import { fetchAPI } from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("legendbook_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const login = async ({ name }) => {
    const res = await fetchAPI("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res?.id) throw new Error("login failed");
    const u = { id: res.id, name: res.name, avatar: res.avatar || null };
    setUser(u);
    try {
      localStorage.setItem("legendbook_user", JSON.stringify(u));
    } catch (e) {
      // ignore storage errors
    }
    return u;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("legendbook_user");
    } catch (e) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
