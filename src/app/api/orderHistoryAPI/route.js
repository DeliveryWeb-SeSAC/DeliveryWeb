import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const orderData = await req.json();

        if (!orderData || !orderData.userEmail || !orderData.totalPaymentAmount) {
            return new Response(JSON.stringify({ message: 'Invalid order data provided.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const orderHistoryFilePath = path.join(process.cwd(), 'src', 'data', 'order-history.json');
        let orderHistory = [];

        // Check if the file exists and read its content
        if (fs.existsSync(orderHistoryFilePath)) {
            const fileContent = fs.readFileSync(orderHistoryFilePath, 'utf-8');
            if (fileContent) {
                orderHistory = JSON.parse(fileContent);
            }
        }

        orderHistory.push(orderData);

        fs.writeFileSync(orderHistoryFilePath, JSON.stringify(orderHistory, null, 2), 'utf-8');

        return new Response(JSON.stringify({ message: 'Order history saved successfully.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Failed to save order history:', error);
        return new Response(JSON.stringify({ message: 'Failed to save order history.', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}