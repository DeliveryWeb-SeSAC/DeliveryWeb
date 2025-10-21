'use client'
import style from './store.module.css'
import { getStoreList } from "../api/storeAPI/route";
import { useEffect, useState } from "react";
import StoreItem from './storeItem/storeItem';
import SearchBar from '../searchBar/page';

export default function Store() {
  const [stores, setStores] = useState([]);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    const fetched = getStoreList();
    setStores(fetched);
    setNewList(fetched);
  }, []);

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
      <div className={style.storeContainer}>
        {newList.length > 0 ? (
          newList.map((store) => (
            <StoreItem key={store.id} store={store} />
          ))
        ) : (<p>결과 없음</p>)
        }
      </div>

      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
    </>
  );
}
