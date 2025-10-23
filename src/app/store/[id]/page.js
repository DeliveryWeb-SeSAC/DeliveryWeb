'use client'
import { getStoreById } from "@/app/api/storeAPI/route"
import Menu from "@/app/menu/page"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import styles from '@/app/store/storeItem/StoreItem.module.css'

export default function StoreDetail(){

    const {id} = useParams()  // pathVariable 값을 가져올 수 있다 /meun/[id]

    const [store,setStore] = useState()

    useEffect(() => {
        setStore(getStoreById(id))
    }, []);

    return(
        store && 
        <>
            <header>{store.name}</header>    
            <div className={styles.storeContainer}>                
                <img src={store.logo} alt={`${store.name} 로고`}/>               
                <div className={styles.storeInfo}>
                    {store.address}
                    {store.star}
                    {store.delivery}
                </div>
                <div>
                    <Menu id={store.id} getMenu={store.foods}/>
                </div>
            </div>
        </> 
    )
}