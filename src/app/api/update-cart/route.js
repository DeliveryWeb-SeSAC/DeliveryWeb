import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const { userEmail, cart } = await req.json();

        if (!userEmail || !cart) {
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