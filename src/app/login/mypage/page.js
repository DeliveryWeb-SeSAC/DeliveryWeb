"use client";

import { useSearchParams, useRouter } from "next/navigation";
import users from "../../data/user-info.json";

export default function Mypage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const userInfo = users.find((u) => u.email === email);

  if (!userInfo) {
    return <p>유저 정보를 불러올 수 없습니다.</p>;
  }

  const handleEditAddress = () => alert("주소 수정 버튼 클릭됨");
  const handleAddAddress = () => alert("주소 추가 버튼 클릭됨");
  const onClickHandlerEditUserInfo = () => {
    alert("회원정보 수정 완료!");
    router.push("/login");
  };

  return (
    <>
      <h1>마이페이지</h1>

      <div style={{ marginBottom: 16 }}>
        <p><b>아이디:</b> {userInfo.email}</p>
        <p><b>이름:</b> {userInfo.name}</p>
        <p><b>생년월일:</b> {userInfo.birth}</p>
        <p>
          <b>주소:</b> {userInfo.address1}{" "}
          <button type="button" onClick={handleEditAddress}>수정</button>
        </p>
        {userInfo.address2 && <p><b>추가주소1:</b> {userInfo.address2}</p>}
        {userInfo.address3 && <p><b>추가주소2:</b> {userInfo.address3}</p>}
        <button type="button" onClick={handleAddAddress}>주소 추가</button>
        <p><b>전화번호:</b> {userInfo.phone}</p>
        <p><b>선호 음식:</b> {userInfo.favoriteFoods?.join(", ")}</p>
      </div>

      <button type="button" onClick={onClickHandlerEditUserInfo}>
        회원 정보 수정하기
      </button>
    </>
  );
}