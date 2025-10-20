'use client'
import StoreDetail from '@/app/store/Item/StoreDetail';
import style from './Store.module.css'
import StoreItem from "@/app/store/Item/storeItem";
import { getStoreList } from "@/app/api/storeAPI/page";
import { useEffect, useState } from "react";

export default function Store(){
    const [stores,setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(()=>{
        // 별점순 정렬
        const fetchedStore = getStoreList()
        const sortStore = [...fetchedStore].sort((a,b)=>{
            return b.star - a.star})

        setStores(sortStore);
    },[]);
    
    const handleStoreSelect = (store) => {
        setSelectedStore(store);
    };

    return(
        <>
            <div>
                <StoreDetail store={selectedStore} onClose={() => setSelectedStore(null)} />
            </div>
            <div className={style.storeContainer}>
                {stores.map(store => <StoreItem key={store.id} store={store} onClick={() => handleStoreSelect(store)}/>)}
            </div>
        </>
    )
}