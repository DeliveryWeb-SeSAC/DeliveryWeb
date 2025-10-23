import stores from '@/data/storeList.json'

export function getFood(id, foodName){                                                             
    const store = stores.find(store => store.id === parseInt(id));                                 
    if (store) {                                                                                   
        return store.foods.find(food => food.name === foodName);                                   
    }                                                                                              
        return null
}
