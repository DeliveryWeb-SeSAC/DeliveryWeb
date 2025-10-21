'use client';
import Store from "./store/page.js";
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import Image from "next/image";
import styles from "./page.module.css";
import Login from "./login/page";

export default function Home() {

    return (
        <div style={{padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center'}}>
            <Store/>
        </div>
    );
}
