"use client";

import { useSearchParams, useRouter } from "next/navigation";
import users from "../../data/user-info.json";

export default function LoginSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const user = users.find((u) => u.email === email);

  if (!user) {
    return <p>로그인 정보를 찾을 수 없습니다.</p>;
  }

  const handleGoMyPage = () => {
    router.push(`/login/mypage?email=${encodeURIComponent(user.email)}`);
  };

  return (
    <>
      <h1>로그인 성공!</h1>
      <p>
        <b>{user.name}</b> 님이 로그인 하셨습니다!
      </p>

      <h3>주소 목록</h3>
      <ul>
        {[user.address1, user.address2, user.address3]
          .filter(Boolean)
          .map((addr, i) => (
            <li key={i}>{addr}</li>
          ))}
      </ul>

      <button onClick={handleGoMyPage}>마이페이지로 이동</button>
    </>
  );
}