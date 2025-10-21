"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginSuccessPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const email = sp.get("email");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!email) return;
    (async () => {
      const res = await fetch(`/api/users/${encodeURIComponent(email)}`);
      if (res.ok) setUser(await res.json());
    })();
  }, [email]);

  if (!email) return <p>email 파라미터가 없습니다.</p>;
  if (!user) return <p>로딩중…</p>;

  const addresses = [user.address1, user.address2, user.address3].filter(Boolean);

  return (
    <>
      <h1>로그인 성공</h1>
      <p><b>{user.name}</b> 님이 로그인 하셨습니다!</p>
      <h3>주소</h3>
      <ul>{addresses.map((a, i) => <li key={i}>{a}</li>)}</ul>
      <button onClick={() => router.push(`/login/mypage?email=${encodeURIComponent(user.email)}`)}>
        마이페이지로 이동
      </button>
    </>
  );
}