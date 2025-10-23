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
        <>
            <Link href={`/menu/${id}/${menu.name}`}>
                <div className={itemStyle.MenuItem}>
                    <h3>메뉴명 : {menu.name}</h3>
                </div>
            </Link>
            <div>
                <button onClick={handleAddStore}>장바구니 담기</button>
            </div>
        </>
    )
}