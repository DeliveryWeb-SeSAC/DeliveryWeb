'use client';
import {useState, useEffect, useRef, Suspense, useCallback} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import styles from './cart.module.css';

function CartContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const inputRefs = useRef({});

    // localStorage 변경 이벤트를 감지하고 리렌더링을 트리거하기 위한 상태
    const [localStorageUpdated, setLocalStorageUpdated] = useState(0);

    // 사용자 및 장바구니 데이터를 가져오는 함수를 useCallback으로 래핑
    const fetchUsersAndSetCart = useCallback(async () => {
        try {
            const response = await fetch('/api/cartAPI'); // 경로 수정
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();

            let userEmail = searchParams.get('userEmail');

            // searchParams에 userEmail이 없으면 localStorage에서 시도
            if (!userEmail || userEmail.trim() === '') {
                userEmail = localStorage.getItem('userEmail');
            }

            // 테스트를 위한 기본 사용자 (여전히 userEmail이 없는 경우)
            // if (!userEmail || userEmail.trim() === '') {
            //     userEmail = users[0]?.email; // 첫 번째 사용자를 기본값으로 사용
            // }

            if (userEmail) {
                const foundUser = users.find(u => u.email === userEmail);
                if (foundUser) {
                    setUser(foundUser);
                    setCart(foundUser.cart || []);
                } else {
                    // localStorage나 searchParams의 userEmail이 유효하지 않은 경우
                    console.warn(`User with email ${userEmail} not found. Clearing cart.`);
                    setUser(null);
                    setCart([]);
                    localStorage.removeItem('userEmail'); // 유효하지 않은 이메일 제거
                }
            } else {
                // userEmail을 어디에서도 찾을 수 없는 경우
                setUser(null);
                setCart([]);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
            setCart([]);
        }
    }, [searchParams, localStorageUpdated]); // searchParams 또는 localStorageUpdated가 변경될 때 함수 재생성

    // 초기 로드 및 searchParams 또는 localStorageUpdated 변경 시 데이터 가져오기
    useEffect(() => {
        fetchUsersAndSetCart();
    }, [fetchUsersAndSetCart]); // memoized된 fetchUsersAndSetCart 함수에 의존

    // 'storage-update' 이벤트를 수신하는 useEffect
    useEffect(() => {
        const handleStorageUpdate = () => {
            console.log('storage-update event received in CartContent');
            // 상태를 업데이트하여 fetchUsersAndSetCart를 다시 실행하도록 트리거
            setLocalStorageUpdated(prev => prev + 1);
        };

        window.addEventListener('storage-update', handleStorageUpdate);

        return () => {
            window.removeEventListener('storage-update', handleStorageUpdate);
        };
    }, []); // 컴포넌트 마운트 시 한 번만 실행하여 이벤트 리스너 설정

    // 장바구니 내용 변경 시 총 가격 업데이트
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

    const updateUserCart = async (cartToUpdate) => {
        if (!user) return false;
        try {
            const response = await fetch('/api/cartAPI', { // 경로 수정
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: user.email, cart: cartToUpdate}),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({message: 'Failed to update cart.'}));
                throw new Error(errorData.message);
            }
            return true;
        } catch (error) {
            console.error('Error updating cart:', error);
            alert(`장바구니 업데이트 중 오류가 발생했습니다: ${error.message}`);
            return false;
        }
    };

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

    const handleRemoveItem = async (restaurantName, foodId) => {
        const updatedCart = cart.map(r => {
            if (r.restaurantName === restaurantName) {
                const updatedItems = r.items.filter(item => item.foodId !== foodId);
                return updatedItems.length > 0 ? {...r, items: updatedItems} : null;
            }
            return r;
        }).filter(Boolean);
        setCart(updatedCart);

        if (updatedCart.length === 0) {
            await updateUserCart(updatedCart);
        }
    };

    const handleGoToPayment = async () => {
        let itemWithNoQuantity = null;
        for (const r of cart) {
            itemWithNoQuantity = r.items.find(item => item.quantity === '' || item.quantity === 0);
            if (itemWithNoQuantity) break;
        }

        const proceedToPayment = async (currentCart) => {
            const success = await updateUserCart(currentCart);
            if (success) {
                const cartQuery = encodeURIComponent(JSON.stringify(currentCart));
                router.push(`/payment?userEmail=${user.email}&cart=${cartQuery}`);
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
            <h1 className={styles.title}>{user.name}님의 장바구니</h1>
            {cart.length === 0 ? (
                <p>장바구니가 비어있습니다.</p>
            ) : (
                cart.map((restaurant) => (
                    <div key={restaurant.restaurantName}
                         className={styles.cartList}
                         style={{marginTop: '20px', border: '1px solid #ccc', padding: '10px'}}>
                        <h3>{restaurant.restaurantName}</h3>
                        <ul>
                            {restaurant.items.map((item) => (
                                <li key={item.foodId}  className={styles.cartItem} style={{marginBottom: '10px'}}>
                                    {item.foodName} -
                                    <input
                                        ref={el => inputRefs.current[item.foodId] = el}
                                        type="number" inputMode="numeric" pattern="[0-9]*"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(restaurant.restaurantName, item.foodId, e.target.value)}
                                        // style={{width: '50px', margin: '0 10px'}}
                                        className={styles.quantityInput}
                                    />
                                    <span className={styles.cartItemPrice}>x {item.price.toLocaleString()}원</span>
                                    <button className={styles.cartBtn} onClick={() => handleRemoveItem(restaurant.restaurantName, item.foodId)}
                                            style={{marginLeft: '10px'}}>x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
            <div className={styles.totalSection}>
                {/*<h2 style={{marginTop: '20px'}}>총 주문 금액: {totalPrice.toLocaleString()}원</h2>*/}
                <span className={styles.totalPrice}>총 주문 금액: {totalPrice.toLocaleString()}원</span>
                <button className={styles.checkoutBtn} onClick={handleGoToPayment} disabled={cart.length === 0}>결제하기</button>
            </div>
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