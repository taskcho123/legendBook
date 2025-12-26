import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import TopBar from "../components/TopBar";

export default function LoginMenu() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("이름을 입력해주세요.");
    try {
      await login({ name });
      navigate("/menu");
    } catch (err) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <TopBar imageSrc={"/top_bar.jpg"} backButtonSrc={null} />
      <div style={{ padding: 20 }}>
        <h2>{isSignup ? "회원가입" : "로그인"}</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420 }}
        >
          <input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: 10, fontSize: 16 }}
          />

          <Button type="submit">{isSignup ? "회원가입" : "로그인"}</Button>
        </form>

        <div style={{ marginTop: 12 }}>
          <button
            onClick={() => setIsSignup((s) => !s)}
            style={{ background: "none", border: "none", color: "#06f", cursor: "pointer" }}
          >
            {isSignup ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 회원가입"}
          </button>
        </div>
      </div>
    </div>
  );
}
