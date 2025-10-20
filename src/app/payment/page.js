'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import users from '../data/users.json';

// 결제 시도할 경우 ->
function PaymentContent() {
  const searchParams = useSearchParams();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentDate, setPaymentDate] = useState(null);
  const user = users[0]; // For user's name

  useEffect(() => {
    const cartQuery = searchParams.get('cart');
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

  const handleConfirmPayment = () => {
    setPaymentDate(new Date());
    setIsPaid(true);
  };

  if (isPaid) {
    return (
      <div>
        <h2 style={{ color: 'green' }}>"설정된 카드로 주문 결제가 완료 되었습니다."</h2>
        <div style={{ border: '2px solid #333', padding: '20px', margin: '20px 0', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>영수증</h3>
          <p><strong>결제 시간:</strong> {paymentDate.toLocaleString('ko-KR')}</p>
          <p><strong>주문자:</strong> {user.name}</p>
          <hr style={{ border: '1px dashed #ccc' }} />
          {cart.map((restaurant) => (
            <div key={restaurant.restaurantName} style={{ margin: '15px 0' }}>
              <h4>{restaurant.restaurantName}</h4>
              {restaurant.items.map((item) => (
                <div key={item.foodId} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.foodName} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              ))}
            </div>
          ))}
          <hr style={{ border: '1px dashed #ccc' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '15px' }}>
            <span>총 결제 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
        <Link href="/">
          <button>새 주문 시작하기</button>
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
      <h1>{user.name}님의 결제</h1>
      <h2>주문 요약</h2>
      {cart.map((restaurant) => (
        <div key={restaurant.restaurantName} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
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
      <h2 style={{ marginTop: '20px' }}>총 주문 금액: {totalPrice.toLocaleString()}원</h2>
      <button onClick={handleConfirmPayment}>결제 확인</button>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
