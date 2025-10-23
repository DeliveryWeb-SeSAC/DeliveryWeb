'use client'
import { getFood } from "@/app/api/menuAPI/menu"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function MenuDetail(){

    const {id, name} = useParams()  // pathVariable 값을 가져올 수 있다 /meun/[id]
    const decode_name = decodeURIComponent(name)
    const [menu,setMenu] = useState()


    useEffect(() => {
        console.log(`MenuDetail: ${id} ${decode_name}`)
        setMenu(getFood(id,decode_name))
    },[])

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

    return(
        menu && 
        <>
            <h1>{menu.name} 상세 페이지</h1>
            <h3>메뉴 가격: {menu.price}</h3>
            <h3>메뉴 칼로리: {menu.kcal}</h3>
            <h3>메뉴 설명: {menu.desc}</h3>
            <img src={menu.image} style={{maxWidth: 500}}/>
            <div>
                <button onClick={handleAddStore}>장바구니</button>
            </div>
        </>  
    )
}