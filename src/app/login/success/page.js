"use client";
import style from "./success.module.css"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginSuccessPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const email = sp.get("email");
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    if (!email) return;
    (async () => {
      const res = await fetch(`/api/users/${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json()
        setUser(data);
        setSelectedAddress(data.address1 || "");
      };
    })();
  }, [email]);

  if (!email) return <p>email 파라미터가 없습니다.</p>;
  if (!user) return <p>로딩중...</p>;

  const addresses = [user.address1, user.address2, user.address3].filter(Boolean);
  const extraAddresses = addresses.slice(1);
  return (
    <>
      <div className={style.sidebar}>
        <p className={style.user}><b>{user.name}</b> 님, 맛있는 식사하세요!</p>

        <div className={style.addressContainer}>
          <label htmlFor="address" className={style.label}>주소🏡</label>

          {extraAddresses.length === 0 ? (
            // address1만 있는 경우: 텍스트로 표시
            <p className={style.selected}>{user.address1 || "주소 없음"}</p>
          ) : (
            // 2개 이상 있을 때: 드롭다운
            <select
              id="address"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className={style.dropdown}
            >
              {addresses.map((addr, i) => (
                <option key={i} value={addr}>{addr}</option>
              ))}
            </select>
          )}
        </div>
        <button onClick={() => router.push(`/login/mypage?email=${encodeURIComponent(user.email)}`)} className={style.button}>
          마이페이지
        </button>
      </div>
    </>
  );
}