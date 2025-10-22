"use client";
import styles from './success.module.css';  // 하위 폴더 내 CSS import (이제  파일 생성으로 OK)
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginSuccessPage() {
  const sp = useSearchParams();
  const email = sp.get("email");
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        const res = await fetch(`/api/users/${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setSelectedAddress(data.address1 || "");
        } else {
          console.error("User fetch failed:", res.status);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    })();
  }, [email]);

  if (!email) return <p className={styles.error}>email 파라미터가 없습니다.</p>;
  if (!user) return <p className={styles.loading}>로딩중...</p>;

  const addresses = [user.address1, user.address2, user.address3].filter(Boolean);
  const extraAddresses = addresses.slice(1);

  return (
    <div className={styles.sidebar}>
      <p className={styles.user}>
        <b>{user.name}</b> 님, 맛있는 식사하세요!
      </p>

      <div className={styles.addressContainer}>
        <label htmlFor="address" className={styles.label}>주소🏡</label>

        {extraAddresses.length === 0 ? (
          <p className={styles.selected}>{user.address1 || "주소 없음"}</p>
        ) : (
          <select
            id="address"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className={styles.dropdown}
          >
            {addresses.map((addr, i) => (
              <option key={i} value={addr}>{addr}</option>
            ))}
          </select>
        )}
      </div>
      <button
        onClick={() => window.open(`/login/mypage?email=${encodeURIComponent(user.email)}`, "_blank")}
        className={styles.button}
      >
        마이페이지
      </button>
    </div>
  );
}