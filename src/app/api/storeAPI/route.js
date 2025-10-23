import stores from '@/data/storeList.json'

// 식당 데이터 조회
export function getStoreList(){
    return stores;
};

export function getStoreById(id){
    return stores.filter((store)=> store.id === parseInt(id))[0];
};

export function getStoreName(id){
    const store = stores.find(store => store.id === parseInt(id))
    return store.name
}