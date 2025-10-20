'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import users from '../data/users.json';

export default function Cart() {
  const [cart, setCart] = useState(users[0].cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const inputRefs = useRef({});

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

    const updatedCart = cart.map(restaurant => {
      if (restaurant.restaurantName === restaurantName) {
        const updatedItems = restaurant.items.map(item => 
          item.foodId === foodId ? { ...item, quantity: newQuantity } : item
        );
        return { ...restaurant, items: updatedItems };
      }
      return restaurant;
    });
    setCart(updatedCart);
  };

  const handleRemoveItem = (restaurantName, foodId) => {
    const updatedCart = cart.map(restaurant => {
      if (restaurant.restaurantName === restaurantName) {
        const updatedItems = restaurant.items.filter(item => item.foodId !== foodId);
        // If no items left in the restaurant, return null to filter it out
        return updatedItems.length > 0 ? { ...restaurant, items: updatedItems } : null;
      }
      return restaurant;
    }).filter(Boolean); // Filter out the null entries

    setCart(updatedCart);
  };

  const handleGoToPayment = () => {
    let itemWithNoQuantity = null;
    let restaurantOfItem = null;

    for (const restaurant of cart) {
      itemWithNoQuantity = restaurant.items.find(item => item.quantity === '' || item.quantity === 0);
      if (itemWithNoQuantity) {
        restaurantOfItem = restaurant;
        break;
      }
    }

    if (itemWithNoQuantity) {
      const confirmation = window.confirm(
        `'${itemWithNoQuantity.foodName}' 상품의 수량이 없습니다. \n\n'확인'을 누르면 해당 상품을 삭제하고 결제를 진행하며, \n'취소'를 누르면 수량을 수정합니다.`
      );

      if (confirmation) { // OK -> Delete item and proceed
        const cartAfterItemRemoval = cart.map(r => {
          if (r.restaurantName === restaurantOfItem.restaurantName) {
            const updatedItems = r.items.filter(item => item.foodId !== itemWithNoQuantity.foodId);
            return updatedItems.length > 0 ? { ...r, items: updatedItems } : null;
          }
          return r;
        }).filter(Boolean);

        setCart(cartAfterItemRemoval);
        const cartQuery = encodeURIComponent(JSON.stringify(cartAfterItemRemoval));
        router.push(`/payment?cart=${cartQuery}`);
      } else { // Cancel -> Focus on input
        inputRefs.current[itemWithNoQuantity.foodId]?.focus();
      }
    } else {
      const cartQuery = encodeURIComponent(JSON.stringify(cart));
      router.push(`/payment?cart=${cartQuery}`);
    }
  };

  return (
    <div>
      <h1>{users[0].name}님의 장바구니</h1>
      {cart.map((restaurant) => (
        <div key={restaurant.restaurantName} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>{restaurant.restaurantName}</h3>
          <ul>
            {restaurant.items.map((item) => (
              <li key={item.foodId} style={{ marginBottom: '10px' }}>
                {item.foodName} - 
                <input 
                  ref={el => inputRefs.current[item.foodId] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(restaurant.restaurantName, item.foodId, e.target.value)}
                  style={{ width: '50px', margin: '0 10px' }} 
                />
                x {item.price.toLocaleString()}원
                <button onClick={() => handleRemoveItem(restaurant.restaurantName, item.foodId)} style={{ marginLeft: '10px' }}>x</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2 style={{ marginTop: '20px' }}>총 주문 금액: {totalPrice.toLocaleString()}원</h2>
      <button onClick={handleGoToPayment}>결제하기</button>
    </div>
  );
}
