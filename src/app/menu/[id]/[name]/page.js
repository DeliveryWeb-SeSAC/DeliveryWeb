'use client'
import { getFood } from "@/app/api/menuAPI/menu"
import { getStoreName } from '@/app/api/storeAPI/route'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import styles from '@/app/menu/item/MenuItem.module.css'

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

    return(
        menu &&
        <div className={styles.background}>
            <div className={styles.detailPageContainer}>
                <div className={styles.card}>
                    <div className={styles.imageContainer}>
                        <img
                            src={menu.image || "/placeholder.svg"}
                            alt={menu.name}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{menu.name}</h1>
                            <div className={styles.meta}>
                                <div className={styles.metaInfo}>
                                    <span className={styles.badge}>
                                        {menu.kcal} kcal
                                    </span>
                                    <span className={styles.price}>₩{menu.price.toLocaleString()}</span>
                                </div>
                                <button onClick={handleAddStore} className={styles.button}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    장바구니 담기
                                </button>
                            </div>
                        </div>
                        <div>
                            <h2 className={styles.descriptionTitle}>메뉴 설명</h2>
                            <p className={styles.description}>{menu.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}