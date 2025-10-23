"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from './login.module.css';
import successStyles from './success.module.css';
import loadingImage from '@/data/image/loading.png';


export default function LoginPage() {

  // 변수 관리 
  // 1. 라우터 및 url 파라미터 관련 
  const sp = useSearchParams();
  const router = useRouter();
  const emailFromUrl = sp.get("email");

  // 2. 로그인 폼 입력값 상태 
  const [email, setEmail] = useState(emailFromUrl || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 3. 로그인 결과 및 사용자 정보
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  // 4. 초기 부팅 및 렌더링 제어 
  const [booting, setBooting] = useState(true);
  const didInit = useRef(false);


    /* --------------------------------------------
      2. 로그인 시도 함수 (사용자가 로그인 버튼 클릭 시)
      - 입력된 이메일/비번 검증 후 API 호출
      - 성공 시 user 상태 세팅 + localStorage 저장
  --------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 입력 검증 
    if (!email.trim()) {
      setError("이메일을 입력하세요.");
      return;
    }

    try {
      // 사용자 데이터 요청 
      const res = await fetch(`/api/users/${encodeURIComponent(email.trim())}`);
      if (!res.ok) {
        setError("이메일을 찾을 수 없습니다.");
        return;
      }

      const userData = await res.json();
      
      // 비밀번호 확인 
      if (userData.password !== password) {
        setError("비밀번호가 올바르지 않습니다.");
        return;
      }

      // 로그인 성공 
      setIsSuccess(true);
      setUser(userData);
      setSelectedAddress(userData.address1 || "");
      
      // 로그인 유지용 로컬 저장 및 이벤트 발생 
      localStorage.setItem('userEmail', userData.email);
      window.dispatchEvent(new Event('storage-update'));
      
      alert("로그인이 성공했습니다!");
    } catch (err) {
      console.error("login error:", err);
      setError("서버 오류가 발생했습니다.");
    }
  };

  
    /* --------------------------------------------
      3. 최초 진입 시 자동 로그인 (URL or localStorage)
      - URL의 ?email 파라미터 → 우선
      - 없으면 localStorage.userEmail → 로그인 복원
      - 완료 후 booting 해제
  --------------------------------------------- */
  useEffect(() => {
    if (didInit.current) return;        
    
    didInit.current = true;
    const ac = new AbortController();

    (async () => {
      try {
        const savedEmail = emailFromUrl || localStorage.getItem("userEmail");
        if (!savedEmail) return; 

        const res = await fetch(`/api/users/${encodeURIComponent(savedEmail)}`, { signal: ac.signal });
        if (!res.ok) return;

        const userData = await res.json();
        setUser(userData);
        setSelectedAddress(userData.address1 || "");
        setIsSuccess(true);

        localStorage.setItem("userEmail", userData.email);
        window.dispatchEvent(new Event("storage-update"));
      } catch (e) {
        if (e.name !== "AbortError") console.error("auto login error:", e);
      } finally {
        setBooting(false); 
      }
    })();

    return () => ac.abort();
  }, [emailFromUrl]);


  const onClickHandlerToJoin = () => {
    window.open("/login/join", "_blank");
  };


  /* 5. 회원가입  */
  const handleLogout = () => {
    try {
      localStorage.removeItem("userEmail");
      window.dispatchEvent(new Event("storage-update"));
      alert("로그아웃 하시겠어요?");
    } finally {
      setIsSuccess(false);
      setUser(null);
      setPassword("");
      setSelectedAddress("");
      router.replace("");
    }
  };

  
  if (booting) {
    // return <div><img src={loadingImage.src} alt="" width={50} height={50} /></div>; 
    return <div></div>; 
  }

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
      <button onClick={handleLogout} className={styles.button}>
        로그아웃
      </button>
    </div>
  );
}