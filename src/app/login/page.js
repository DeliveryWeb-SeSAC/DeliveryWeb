"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import users from "../data/user-info.json";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedUser, setLoggedUser] = useState(null);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // 이메일 + 비밀번호가 일치하는 사용자 찾기
        const user = users.find(
            (u) => u.email === email.trim() && u.password === password
        );

        if (!user) {
            setLoggedUser(null);
            setError("이메일 또는 비밀번호가 올바르지 않습니다.");
            return;
        }

        alert("로그인이 성공했습니다!");
        router.push(`/login/success?email=${encodeURIComponent(user.email)}`);

        setLoggedUser(user);
    };


    const addressList =
        loggedUser
            ? [loggedUser.address1, loggedUser.address2, loggedUser.address3].filter(Boolean)
            : [];

    return (
        <>
            <h1>로그인</h1>

            {/* 로그인 폼 */}
            <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 8 }}>
                    <label htmlFor="user-email">아이디(이메일)</label>
                    <input
                        id="user-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        required
                    />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label htmlFor="user-password">비밀번호</label>
                    <input
                        id="user-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        required
                    />
                </div>

                <button type="submit">로그인</button>
            </form>

            {/* 에러 메시지 */}
            {error && <p style={{ color: "crimson" }}>{error}</p>}
        </>
    );
}