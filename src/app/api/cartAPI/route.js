import fs from 'fs';
import path from 'path';

// 사용자 데이터를 조회하는 GET 핸들러
export async function GET() {
    try {
        const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');
        const usersData = fs.readFileSync(usersFilePath, 'utf-8');

        return new Response(usersData, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to read users data:', error);
        return new Response(JSON.stringify({ message: 'Failed to load users data.', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// 기존 장바구니 업데이트를 위한 POST 핸들러
export async function POST(req) {
    try {
        const { userEmail, cart } = await req.json();

        // cart가 undefined일 경우를 명확히 체크
        if (!userEmail || cart === undefined) {
            return new Response(JSON.stringify({ message: 'User email and cart data are required.' }), {
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

        usersData[userIndex].cart = cart;

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