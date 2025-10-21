"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 이메일로 사용자 조회
      const res = await fetch(`/api/users/${encodeURIComponent(email.trim())}`);
      if (!res.ok) {
        
        setError("이메일을 찾을 수 없습니다.");
        return;
      }
      const user = await res.json();

      // 비밀번호 검증
      if (user.password !== password) {
        setError("비밀번호가 올바르지 않습니다.");
        return;
      }

      alert("로그인이 성공했습니다!");
      router.push(`/login/success?email=${encodeURIComponent(user.email)}`);
    } catch (err) {
      console.error("login error:", err);
      setError("서버 오류가 발생했습니다.");
    }
  };

  const onClickHandlerToJoin = () => {
    router.push("/login/join");
  };

  return (
    <>
      <h1>로그인</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <label htmlFor="user-email">아이디(이메일)</label>
          <input
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label htmlFor="user-password">비밀번호</label>
          <input
            id="user-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
        </div>

        <button type="submit">로그인</button>
      </form>

      <button type="button" onClick={onClickHandlerToJoin}>회원가입</button>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
}