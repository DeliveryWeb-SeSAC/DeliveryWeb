"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    const onClickHandlerJoin = (e) => {
        e.preventDefault();
        router.push("/login/join");
    }

    return (
        <>
            <p><b>로그인</b> 후 사용하세요</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user-email">아이디</label>
                    <input
                        type="email"
                        id="user-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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

                <button type="submit">로그인</button><br />
            </form>

            <button onClick={onClickHandlerJoin}>회원 가입</button>
            <button type="submit">마이페이지</button>
        </>
    )
}