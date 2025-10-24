
import Image from "next/image";
import Link from "next/link";
import logo from "@/data/image/logo.png"; // src 폴더를 1@로 alias하여 사용
import styles from "./Header.module.css";

export default function Header(){
    return(
        <>
           
       
        <header className={styles.header}>
            <Link href="/" className={styles.logoLink}>
                <Image src={logo} alt="도락 로고" width={40} height={40} priority className={styles.img} />
                <h1>배달여기어때요! - 친구와, 동료와 함께 즐기는 식사시간</h1>
            </Link>
        </header>
         </>

    )
}