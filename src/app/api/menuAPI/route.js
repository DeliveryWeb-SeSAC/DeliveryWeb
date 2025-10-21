import stores from '@/data/storeList.json'

// 음식 정보 조회
export function getFood(id, foodName){
    return stores.filter(store => {
        return (store.id === parseInt(id)) && (store.foods.name === foodName)
    })
}