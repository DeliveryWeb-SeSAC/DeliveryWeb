import stores from '@/data/storeList.json'
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const { userEmail, restaurantName, menu } = await req.json();

        if (!userEmail || !restaurantName || !menu) {
            return new Response(JSON.stringify({ message: 'User email, restaurant ID, and menu data are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');
        const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const userIndex = usersData.findIndex(u => u.email === userEmail);

        if (userIndex === -1) {
            return new Response(JSON.stringify({ message: 'User not found.' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = usersData[userIndex];
        const restaurantCartIndex = user.cart.findIndex(c => c.restaurantName === restaurantName);

        if (restaurantCartIndex > -1) {
            const restaurantCart = user.cart[restaurantCartIndex];
            const itemIndex = restaurantCart.items.findIndex(i => i.foodName === menu.name);

            if (itemIndex > -1) {
                restaurantCart.items[itemIndex].quantity += 1;
            } else {
                 // 마지막 foodId 가져오기
                let lastId = restaurantCart.items.length
                    ? restaurantCart.items[restaurantCart.items.length - 1].foodId
                    : "food-000"; // 안전장치
                // 숫자 부분만 추출해서 +1
                let num = parseInt(lastId.split('-')[1], 10) + 1;
                // foodId 생성
                const newFoodId = `food-${String(num).padStart(3, '0')}`;

                restaurantCart.items.push({ foodId: newFoodId,
                                            foodName: menu.name,
                                            price: menu.price,
                                            quantity: num, 
                });
            }
        } else {
            user.cart.push({
                restaurantName: restaurantName,
                items: [{ foodId: 'food-000',
                          foodName: menu.name,
                          price: menu.price,
                          quantity: 1,

                }],
            });
        }

        fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf-8');

        return new Response(JSON.stringify({ message: 'Cart updated successfully.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Failed to update cart:', error);
        return new Response(JSON.stringify({ message: 'Failed to update cart.', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}