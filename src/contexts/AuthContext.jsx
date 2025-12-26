import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ name }) => {
    // 간단한 로컬 로그인(서버 연동 시 토큰 저장 등 확장)
    const u = { id: Date.now().toString(), name, avatar: null };
    setUser(u);
    return u;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
