'use client'
import { getStoreList } from "../api/storeAPI/route";
import { useEffect, useState } from "react";
import StoreItem from '@/app/store/storeItem/StoreItem';
import SearchBar from '../searchBar/page';
import { useRouter } from 'next/navigation';
import styles from '@/app/store/store.module.css'; // CSS 모듈 import

export default function Store() {
  const [stores, setStores] = useState([]);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    const fetched = getStoreList();
    setStores(fetched);
    setNewList(fetched);
  }, []);

  const router = useRouter();
  const goDetailPage = (storeId) => {
    router.push(`/store/${storeId}`)
  }

  const handleSearch = (keyword) => {
    const initKeyword = keyword.trim().toLowerCase();
    if (initKeyword === '') {
      setNewList(stores);
      return;
    }

    const filtered = stores.filter(
        (store) =>
            store.name.toLowerCase().includes(initKeyword) ||
            store.foods.some((food) =>
            food.name.toLowerCase().includes(initKeyword)
            )
        );
        setNewList(filtered);
    };

     const handleFilter = (category) => {
        if (category === 'all') {
            setNewList(stores);
            return;
        }

        const filtered = stores.filter(
            (store) =>
                store.category &&
                store.category.toLowerCase() === category.toLowerCase()
        );
        setNewList(filtered);
    };

  return (
    <>
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      {/* storeContainer 클래스를 적용합니다. */}
      <div className={styles.storeContainer}> 
        {newList.length > 0 ? (
          newList.map((store) => (
            <StoreItem key={store.id} store={store} onClick={()=>goDetailPage(store.id)}/>
          ))
        ) : (<p>결과 없음</p>)
        }
      </div>
    </>
  );
}