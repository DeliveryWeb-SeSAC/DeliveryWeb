"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Join() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [foodCategory, setFoodCategory] = useState([]);

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            email,
            password,
            name,
            birth,
            address,
            phone,
            foodCategory,
        });
    };

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFoodCategory((prev) => [...prev, value]);
        } else {
            setFoodCategory((prev) => prev.filter((item) => item !== value));
        }
    };

    const onClickHandlerJoinComplete = (e) => {
        e.preventDefault();
        alert("회원가입이 완료 되었습니다!")
        router.push("/login");
    }

    return (
        <>
            <h1>회원가입</h1>

            {/* 이메일, 비밀번호, 이름, 생년월일, 주소, 전화번호, 선호 음식 카테고리(체크박스) */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user-email">아이디</label>
                    <input
                        type="email"
                        id="user-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="caption">이메일 형식으로 입력하세요</p>
                </div>

                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <input
                        type="password"
                        id="user-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="user-name">이름</label>
                    <input
                        type="text"
                        id="user-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="user-birth">생년월일</label>
                    <input
                        type="date"
                        id="user-birth"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="user-address">주소</label>
                    <input
                        type="text"
                        id="user-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="user-phone">전화번호</label>
                    <input
                        type="tel"
                        id="user-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <fieldset>
                    <legend>선호 음식 카테고리</legend>
                    <label>
                        <input type="checkbox" value="한식" onChange={handleCheckbox} /> 한식
                    </label>
                    <label>
                        <input type="checkbox" value="중식" onChange={handleCheckbox} /> 중식
                    </label>
                    <label>
                        <input type="checkbox" value="일식" onChange={handleCheckbox} /> 일식
                    </label>
                    <label>
                        <input type="checkbox" value="양식" onChange={handleCheckbox} /> 양식
                    </label>
                    <label>
                        <input type="checkbox" value="분식" onChange={handleCheckbox} /> 분식
                    </label>
                </fieldset>  
            </form>

            <button onClick={onClickHandlerJoinComplete}>가입 완료</button>
        </>
    );
}