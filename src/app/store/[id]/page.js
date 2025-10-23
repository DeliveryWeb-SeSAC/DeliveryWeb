'use client'
import { getStoreById } from "@/app/api/storeAPI/route"
import Menu from "@/app/menu/page" // Menu 컴포넌트를 가져옵니다.
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import styles from './storeDetail.module.css' // 새로 만든 CSS 모듈을 가져옵니다.

export default function StoreDetail(){

    const {id} = useParams()  // pathVariable 값을 가져올 수 있다 /meun/[id]

    const [store,setStore] = useState()

    useEffect(() => {
        setStore(getStoreById(id))
    }, []);

    return(
        store && 
        <div className={styles.container}>
            {/* ⭐️ 가게 정보가 세로로 정렬됩니다: 로고 -> 이름 -> 상세정보 */}
            <div className={styles.infoContainer}>  
                <h2 className={styles.storeName}>{store.name}</h2>              
                <img src={store.logo} alt={`${store.name} 로고`} className={styles.logo}/>               
                
                
                <div className={styles.details}>
                    <p>주소: {store.address}</p>
                    <p>평점: {store.star}</p>
                    <p>배달시간: {store.delivery}</p>
                    <p>카테고리: {store.category}</p>
                </div>
            </div>
            <div className={styles.menuContainer}>
                <Menu id={store.id} getMenu={store.foods}/>
            </div>
        </div> 
    )
}