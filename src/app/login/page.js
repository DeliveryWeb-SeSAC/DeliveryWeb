"use client";
import { useState, useEffect } from "react";
import styles from './login.module.css';
import successStyles from './success/success.module.css';
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const sp = useSearchParams();
  const emailFromUrl = sp.get("email");

  const [email, setEmail] = useState(emailFromUrl || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("이메일을 입력하세요.");
      return;
    }

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(email.trim())}`);
      if (!res.ok) {
        setError("이메일을 찾을 수 없습니다.");
        return;
      }
      const userData = await res.json();

      if (userData.password !== password) {
        setError("비밀번호가 올바르지 않습니다.");
        return;
      }

      setIsSuccess(true);
      setUser(userData);
      setSelectedAddress(userData.address1 || "");
      alert("로그인이 성공했습니다!");
    } catch (err) {
      console.error("login error:", err);
      setError("서버 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (emailFromUrl && !isSuccess && !user) {
      (async () => {
        try {
          const res = await fetch(`/api/users/${encodeURIComponent(emailFromUrl)}`);
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            setSelectedAddress(userData.address1 || "");
            setIsSuccess(true);
          } else {
            setError("사용자 정보를 불러올 수 없습니다.");
          }
        } catch (err) {
          console.error("URL init error:", err);
          setError("로딩 중 오류가 발생했습니다.");
        }
      })();
    }
  }, [emailFromUrl, isSuccess]);

  const onClickHandlerToJoin = () => {
    window.open("/login/join", "_blank");
  };

  if (!isSuccess) {
    return (
      <div className={styles.sidebar}>
        <h2 className={styles.title}>로그인</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ID(이메일 형식)"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <input
              id="user-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>로그인</button>
        </form>
        <div className={styles.signup}>
          <span className={styles.signupText}>계정이 없나요?</span>
          <button type="button" className={styles.signupBtn} onClick={onClickHandlerToJoin}>
            회원가입
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }

  if (!user) return <p className={styles.sidebar}>로딩중...</p>;

  const addresses = [user.address1, user.address2, user.address3].filter(Boolean);
  const extraAddresses = addresses.slice(1);

  return (
    <div className={successStyles.sidebar}>
      <p className={successStyles.user}>
        <b>{user.name}</b> 님, 맛있는 식사하세요!
      </p>

      <div className={successStyles.addressContainer}>
        <label htmlFor="address" className={successStyles.label}>
          주소🏡
        </label>

        {extraAddresses.length === 0 ? (
          <p className={successStyles.selected}>
            {user.address1 || "주소 없음"}
          </p>
        ) : (
          <select
            id="address"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className={successStyles.dropdown}
          >
            {addresses.map((addr, i) => (
              <option key={i} value={addr}>{addr}</option>
            ))}
          </select>
        )}
      </div>
      <button
        onClick={() =>
          window.open(
            `/login/mypage?email=${encodeURIComponent(user.email)}`,
            "_blank"
          )
        }
        className={successStyles.button}
      >
        마이페이지
      </button>
    </div>
  ); 
}