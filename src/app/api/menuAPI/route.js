import stores from '@/data/storeList.json'

// 음식 정보 조회
export function getFood(id, foodName){
    const store = stores.find(store => store.id === parseInt(id));
    if (store) {
        return store.foods.find(food => food.name === foodName);
    }
    return null
}