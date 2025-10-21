"use client";
import style from './login.module.css'
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
    window.open("/login/join", "_blank");
  };

  return (
    <>
    <div className={style.sidebar}>
      <h2 className={style.title}>로그인</h2>

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.field}>
          <input
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ID(이메일 형식)"
            required
            className={style.input}
          />
        </div>

        <div className={style.field}>
          <input
            id="user-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            className={style.input}
          />
        </div>

        <button type="submit" className={style.button}>로그인</button>
      </form>
      <div className={style.signup}>
        <span className={style.signupText}>계정이 없나요?</span>
        <button type="button" className={style.signupBtn} onClick={onClickHandlerToJoin}>회원가입</button>
      </div>
      

      {error && <p className={style.error}>{error}</p>}
      </div>
    </>
  );
}