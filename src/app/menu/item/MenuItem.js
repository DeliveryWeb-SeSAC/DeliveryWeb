import Link from "next/link"
import itemStyle from "./MenuItem.module.css"
import {getStoreName} from '@/app/api/storeAPI/route'

export default function MenuItem({id,menu}) {

    const handleAddStore = () => {
        const userEmail = localStorage.getItem('userEmail');
        const restaurantName = getStoreName(id)
        if(userEmail === ''){
            alert('로그인을 해주세요!')
        }   
        else{
            console.log('MenuItem',userEmail, restaurantName, menu)
            fetch('/api/menuAPI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: userEmail,
                    restaurantName: restaurantName,
                    menu: menu,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Cart updated successfully.') {
                    alert('장바구니에 메뉴를 담았습니다.');
                    window.location.reload()
                } else {
                    alert('장바구니에 메뉴를 담는데 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('장바구니에 메뉴를 담는데 실패했습니다.');
            });
        }
    }

    return (
        <div className={itemStyle.menuItemCard}>
            <Link href={`/menu/${id}/${menu.name}`} className={itemStyle.menuItemImageLink}>
                <img
                    src={menu.image || "/placeholder.svg"}
                    alt={menu.name}
                    className={itemStyle.menuItemImage}
                />
            </Link>
            <div className={itemStyle.menuItemInfo}>
                <Link href={`/menu/${id}/${menu.name}`} className={itemStyle.menuItemLink}>
                    <h3 className={itemStyle.menuItemName}>
                        {menu.name}
                    </h3>
                    <p className={itemStyle.menuItemPrice}>{menu.price.toLocaleString()}원</p>
                </Link>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        handleAddStore()
                    }}
                    className={itemStyle.addToCartBtn}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    장바구니 추가
                </button>
            </div>
        </div>
    )
}