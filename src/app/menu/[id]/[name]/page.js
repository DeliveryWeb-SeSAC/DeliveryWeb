'use client'
import { getFood } from "@/app/api/menuAPI/route"
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
    
    return(
        menu && 
        <>
            <h1>{menu.name} 상세 페이지</h1>
            <h3>메뉴 가격: {menu.price}</h3>
            <h3>메뉴 칼로리: {menu.kcal}</h3>
            <h3>메뉴 설명: {menu.desc}</h3>
            <img src={menu.image} style={{maxWidth: 500}}/>
        </>  
    )
}