
import Store from "./store/page.js";
import Link from 'next/link';

import Image from "next/image";
import styles from "./page.module.css";
import Login from "./login/page";

export default function Home() {
  return (
    <>
        <Store />
        <Link href="/cart">
            <button>Go to Cart</button>
        </Link>
    </>
  );
}
