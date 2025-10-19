"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import users from "../../data/user-info.json";

export default function LoginSuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const user = useMemo(() => users.find(u => u.email === email), [email]);

  if (!user) return <p>유저 정보를 찾을 수 없습니다.</p>;

  const addresses = [user.address1, user.address2, user.address3].filter(Boolean);

  return (
    <>
      <h1>로그인 성공</h1>
      <p><b>{user.name}</b> 님이 로그인 하셨습니다!</p>
      <h3>주소</h3>
      <ul>
        {addresses.map((addr, i) => <li key={i}>{addr}</li>)}
      </ul>
    </>
  );
}