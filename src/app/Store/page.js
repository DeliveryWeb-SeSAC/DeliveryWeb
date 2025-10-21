'use client'
import style from './Store.module.css'
import { getStoreList } from "@/app/api/storeAPI/page";
import { useEffect, useState } from "react";
import StoreDetail from './storeItem/StoreDetail';
import StoreItem from './storeItem/storeItem';

export default function Store(){
    const [stores,setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(()=>{

        const fetchedStore = getStoreList()

        setStores(fetchedStore);
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