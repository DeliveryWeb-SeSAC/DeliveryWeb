'use client';
import {useState, useEffect, useRef, Suspense} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import users from '@/data/users.json';

function CartContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const inputRefs = useRef({});

    useEffect(() => {
        let userEmail = searchParams.get('userEmail');

        // Default user for testing
        if (userEmail === null || userEmail.trim() === ''){
            userEmail = users[0].email;
        }

        if (userEmail) {
            const foundUser = users.find(u => u.email === userEmail);
            if (foundUser) {
                setUser(foundUser);
                setCart(foundUser.cart || []);
            } else {
                setUser(null);
                setCart([]);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        const newTotalPrice = cart.reduce((total, restaurant) => {
            const restaurantTotal = restaurant.items.reduce((subTotal, item) => {
                const quantity = Number.isInteger(item.quantity) ? item.quantity : 0;
                return subTotal + item.price * quantity;
            }, 0);
            return total + restaurantTotal;
        }, 0);
        setTotalPrice(newTotalPrice);
    }, [cart]);

    const handleQuantityChange = (restaurantName, foodId, value) => {
        if (value !== '' && !/^\d+$/.test(value)) {
            alert('수량을 입력해주세요.');
            return;
        }
        const newQuantity = value === '' ? '' : parseInt(value, 10);
        const updatedCart = cart.map(r =>
            r.restaurantName === restaurantName
                ? {...r, items: r.items.map(i => i.foodId === foodId ? {...i, quantity: newQuantity} : i)}
                : r
        );
        setCart(updatedCart);
    };

    const handleRemoveItem = (restaurantName, foodId) => {
        const updatedCart = cart.map(r => {
            if (r.restaurantName === restaurantName) {
                const updatedItems = r.items.filter(item => item.foodId !== foodId);
                return updatedItems.length > 0 ? {...r, items: updatedItems} : null;
            }
            return r;
        }).filter(Boolean);
        setCart(updatedCart);
    };

    const handleGoToPayment = async () => {
        let itemWithNoQuantity = null;
        for (const r of cart) {
            itemWithNoQuantity = r.items.find(item => item.quantity === '' || item.quantity === 0);
            if (itemWithNoQuantity) break;
        }

        const proceedToPayment = async (currentCart) => {
            try {
                const response = await fetch('/api/update-cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail: user.email, cart: currentCart }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update cart.');
                }

                const cartQuery = encodeURIComponent(JSON.stringify(currentCart));
                router.push(`/payment?userEmail=${user.email}&cart=${cartQuery}`);

            } catch (error) {
                console.error('Error updating cart:', error);
                alert('장바구니 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        };

        if (itemWithNoQuantity) {
            const confirmation = window.confirm(`'${itemWithNoQuantity.foodName}' 상품의 수량이 없습니다. 수량을 수정하시겠습니까?`);
            if (!confirmation) {
                const cartAfterItemRemoval = cart.map(r => ({
                    ...r,
                    items: r.items.filter(i => i.foodId !== itemWithNoQuantity.foodId)
                })).filter(r => r.items.length > 0);
                setCart(cartAfterItemRemoval);
                await proceedToPayment(cartAfterItemRemoval);
            } else {
                inputRefs.current[itemWithNoQuantity.foodId]?.focus();
            }
        } else {
            await proceedToPayment(cart);
        }
    };

    if (!user) {
        return (
            <div>
                <h1>장바구니</h1>
                <p>사용자 정보가 올바르지 않습니다. 홈에서 사용자를 다시 선택해주세요.</p>
                <Link href="/">홈으로 돌아가기</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{user.name}님의 장바구니</h1>
            {cart.length === 0 ? (
                <p>장바구니가 비어있습니다.</p>
            ) : (
                cart.map((restaurant) => (
                    <div key={restaurant.restaurantName}
                         style={{marginTop: '20px', border: '1px solid #ccc', padding: '10px'}}>
                        <h3>{restaurant.restaurantName}</h3>
                        <ul>
                            {restaurant.items.map((item) => (
                                <li key={item.foodId} style={{marginBottom: '10px'}}>
                                    {item.foodName} -
                                    <input
                                        ref={el => inputRefs.current[item.foodId] = el}
                                        type="number" inputMode="numeric" pattern="[0-9]*"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(restaurant.restaurantName, item.foodId, e.target.value)}
                                        style={{width: '50px', margin: '0 10px'}}
                                    />
                                    x {item.price.toLocaleString()}원
                                    <button onClick={() => handleRemoveItem(restaurant.restaurantName, item.foodId)}
                                            style={{marginLeft: '10px'}}>x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
            <h2 style={{marginTop: '20px'}}>총 주문 금액: {totalPrice.toLocaleString()}원</h2>
            <button onClick={handleGoToPayment} disabled={cart.length === 0}>결제하기</button>
        </div>
    );
}

export default function CartPage() {
    return (
        <Suspense fallback={<div>장바구니를 불러오는 중...</div>}>
            <CartContent/>
        </Suspense>
    );
}
