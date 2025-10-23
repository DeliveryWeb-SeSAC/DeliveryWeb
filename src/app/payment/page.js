'use client';
import {useEffect, useState, Suspense} from 'react';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import styles from "@/app/cart/cart.module.css";

function PaymentContent() {
    const searchParams = useSearchParams();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isPaid, setIsPaid] = useState(false);
    const [paymentDate, setPaymentDate] = useState(null);

    useEffect(() => {
        const userEmail = searchParams.get('userEmail');
        const cartQuery = searchParams.get('cart');

        // 사용자 정보 설정
        const fetchUser = async () => {
            if (userEmail) {
                try {
                    const response = await fetch('/api/cartAPI');
                    if (!response.ok) {
                        throw new Error('Failed to fetch users');
                    }
                    const users = await response.json();
                    const foundUser = users.find(u => u.email === userEmail);
                    setUser(foundUser || null);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                }
            }
        };
        fetchUser();

        // 장바구니 정보 설정
        if (cartQuery) {
            try {
                const decodedCart = JSON.parse(decodeURIComponent(cartQuery));
                setCart(decodedCart);

                const newTotalPrice = decodedCart.reduce((total, restaurant) => {
                    const restaurantTotal = restaurant.items.reduce((subTotal, item) => {
                        const quantity = Number.isInteger(item.quantity) ? item.quantity : 0;
                        return subTotal + item.price * quantity;
                    }, 0);
                    return total + restaurantTotal;
                }, 0);
                setTotalPrice(newTotalPrice);
            } catch (error) {
                console.error("장바구니 데이터를 불러오는 데 실패했습니다:", error);
            }
        }
    }, [searchParams]);

    const saveOrderHistory = async (order) => {
        try {
            const response = await fetch('/api/orderHistoryAPI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({message: 'Failed to save order history.'}));
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Error saving order history:', error);
        }
    };

    const handleConfirmPayment = async () => {
        if (!user) {
            alert("사용자 정보가 없습니다.");
            return;
        }

        const currentPaymentDate = new Date();
        setPaymentDate(currentPaymentDate);

        const orderDetails = {
            userEmail: user.email,
            userName: user.name,
            paymentDate: currentPaymentDate.toISOString(),
            restaurants: cart.map(restaurant => ({
                restaurantName: restaurant.restaurantName,
                items: restaurant.items.map(item => ({
                    foodName: item.foodName,
                    quantity: item.quantity,
                    itemPaymentAmount: item.price * item.quantity,
                })),
            })),
            totalPaymentAmount: totalPrice,
        };

        saveOrderHistory(orderDetails);

        try {
            const response = await fetch('/api/cartAPI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: user.email, cart: []}),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({message: 'Failed to clear cart.'}));
                throw new Error(errorData.message);
            }

            alert(`${user.name}님의 장바구니에 담긴 음식들의 주문 결제가 완료되었습니다.`);

            // 장바구니 비우기 성공 시 로컬스토리지 갱신 및 이벤트 발생
            localStorage.setItem('userEmail', user.email); // 현재 로그인된 사용자 이메일로 로컬스토리지 갱신
            window.dispatchEvent(new Event('storage-update')); // 장바구니 페이지 리렌더링을 위한 이벤트 발생

            setIsPaid(true);

        } catch (error) {
            console.error('Error clearing cart:', error);
            alert(`결제 처리 중 장바구니를 비우는 데 실패했습니다: ${error.message}`);
            setIsPaid(true);
        }
    };

    if (!user) {
        return (
            <div>
                <h1>결제</h1>
                <p>사용자 정보가 올바르지 않습니다. 홈에서 사용자를 다시 선택해주세요.</p>
                <Link href="/">홈으로 돌아가기</Link>
            </div>
        );
    }

    if (isPaid) {
        return (
            <div className={styles.restaurantContainer}>
                <h2 style={{color: 'green'}}>"설정된 카드로 주문 결제가 완료 되었습니다."</h2>
                <div style={{border: '1px solid #333', padding: '20px', margin: '20px 0', backgroundColor: '#f9f9f9', borderRadius: '18px'}}>
                    <h3 style={{textAlign: 'center', marginBottom: '20px'}}>영수증</h3>
                    <p><strong>결제 시간:</strong> {paymentDate.toLocaleString('ko-KR')}</p>
                    <p><strong>주문자:</strong> {user.name}</p>
                    <hr style={{border: '1px dashed #ccc'}}/>
                    {cart.map((restaurant) => (
                        <div key={restaurant.restaurantName} style={{margin: '15px 0'}}>
                            <h4>{restaurant.restaurantName}</h4>
                            {restaurant.items.map((item) => (
                                <div key={item.foodId} style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span>{item.foodName} x{item.quantity}</span>
                                    <span>{(item.price * item.quantity).toLocaleString()}원</span>
                                </div>
                            ))}
                        </div>
                    ))}
                    <hr style={{border: '1px dashed #ccc'}}/>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        marginTop: '15px'
                    }}>
                        <span>총 결제 금액</span>
                        <span>{totalPrice.toLocaleString()}원</span>
                    </div>
                </div>
                <Link href="/" style={{ display: 'block', textAlign: 'right' }}>
                    <button className={styles.checkoutBtn}>새 주문 시작하기</button>
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div>
                <h1>결제</h1>
                <p>장바구니에 상품이 없거나, 잘못된 접근입니다.</p>
                <Link href="/cart">장바구니로 돌아가기</Link>
            </div>
        );
    }

    return (
        <div>
            <h1 style={{margin: '10px'}}>{user.name}님의 결제</h1>
            <h2 style={{margin: '30px', marginLeft: '80px'}}>주문 요약</h2>
            {cart.map((restaurant) => (
                // <div key={restaurant.restaurantName}
                //      style={{marginTop: '20px', border: '1px solid #ccc', padding: '10px'}}>
                <div key={restaurant.restaurantName} className={styles.restaurantContainer}>
                    <h3>{restaurant.restaurantName}</h3>
                    <ul>
                        {restaurant.items.map((item) => (
                            <li key={item.foodId}>
                                {item.foodName} - {item.quantity} x {item.price.toLocaleString()}원
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <h2 style={{marginTop: '20px', textAlign:'end', marginRight: '60px'}}>총 주문 금액: {totalPrice.toLocaleString()}원</h2>
            {/*<button className={styles.checkoutBtn} onClick={handleConfirmPayment}>결제 확인</button>*/}
            <div style={{textAlign: 'right'}}>
                <button className={styles.checkoutBtn}
                    onClick={handleConfirmPayment}
                    style={{marginRight: '50px'}}>
                    결제 확인
                </button>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>결제 정보를 불러오는 중...</div>}>
            <PaymentContent/>
        </Suspense>
    );
}