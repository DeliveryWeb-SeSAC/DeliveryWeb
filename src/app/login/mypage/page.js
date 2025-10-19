"use client"

import { useRouter } from "next/navigation";

export default function MyPage() {
    const userInfo = {
        email: "hoho@naver.com",
        name: "홍길동",
        birth: "1995-08-20",
        address: "서울시 강남구",
        phone: "010-1234-5678",
        favoriteFoods: ["한식", "분식", "일식"],
    };
    const router = useRouter();

    const handleEditAddress = () => alert("주소 수정 버튼 클릭됨");
    const handleAddAddress = () => alert("주소 추가 버튼 클릭됨");
    const onClickHandlerEditUserInfo = (e) => {
        e.preventDefault();
        alert("회원가입이 완료 되었습니다!")
        router.push("/login");
    }

    

    return (
        <>
            <h1>마이페이지</h1>

            <div style={{ marginBottom: 16 }}>
                <p><b>아이디:</b> {userInfo.email}</p>
                <p><b>이름:</b> {userInfo.name}</p>
                <p><b>생년월일:</b> {userInfo.birth}</p>
                <p>
                    <b>주소:</b> {userInfo.address}{" "}
                    <button type="button" onClick={handleEditAddress}>수정</button>
                </p>
                <button type="button" onClick={handleAddAddress}>주소 추가</button>
                <p><b>전화번호:</b> {userInfo.phone}</p>
                <p><b>선호 음식:</b> {userInfo.favoriteFoods.join(", ")}</p>
            </div>

            <button type="button" onClick={onClickHandlerEditUserInfo}>회원 정보 수정하기</button>
        </>
    );
}