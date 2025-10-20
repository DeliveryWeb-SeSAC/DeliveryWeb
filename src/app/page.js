'use client';
import Store from "./store/page.js";
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import Image from "next/image";
import styles from "./page.module.css";
import Login from "./login/page";

export default function Home() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleGoToCart = () => {
        router.push(`/cart?userEmail=${email}`);
    };

    return (
        <div style={{padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center'}}>
            <Store/>
            <h1>이메일로 장바구니 열기</h1>
            <p>장바구니를 보려면 이메일 주소를 입력하세요.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px'}}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소 입력"
                    style={{padding: '10px', fontSize: '16px'}}
                />
                <button
                    onClick={handleGoToCart}
                    style={{padding: '10px', fontSize: '16px', cursor: 'pointer'}}
                >
                    장바구니 보기
                </button>
            </div>
        </div>
    );
}
