'use client'
import style from './Store.module.css'
import { getStoreList } from "@/app/api/storeAPI/page";
import { useEffect, useState } from "react";
import StoreItem from './storeItem/storeItem';
import SearchBar from '../searchBar/page';

export default function Store(){
    const [stores,setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [newList,setNewList] = useState([]);    

    useEffect(()=>{

        const fetchedStore = getStoreList()

        setStores(fetchedStore); 
        setNewList(fetchedStore); // 초기 목록
        },[]);
    
        const handleStoreSelect = (store) => {
            setSelectedStore(store);
        };

        const handleSearch = (keyword) => {
            const initKeyword = keyword.trim().toLowerCase();
            if (initKeyword === '') {
                setNewList(stores); // 검색어 없으면 전체 목록 반환
                return;
            }

        const filtered = stores.filter(store => 
            store.name.toLowerCase().includes(initKeyword) || store.foods.some(food => food.name.toLowerCase().includes(initKeyword)));
        setNewList(filtered);
        }

        const handleFilter = (category) => {
            if (category === 'all') {
                setNewList(stores);
                return;
            }

            const filtered = stores.filter(store => 
                store.category.toLowerCase() === category.toLowerCase()
            );
            setNewList(filtered);
    };
    
    return(
        <>
            <div className={style.storeContainer}>
                {newList.length > 0 ? (
                newList.map((store) => (
                    <StoreItem key={store.id} store={store} />
                ))
                ) : (
                <p>결과 없음</p>
                )}
            </div>
            <div>
                <SearchBar onSearch={handleSearch} onFilter={handleFilter}/>
            </div>
        </>
    )
}