import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function LoginMenu() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!name) return alert("이름을 입력해주세요.");
    await login({ name });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>로그인</h2>
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
    </div>
  );
}
