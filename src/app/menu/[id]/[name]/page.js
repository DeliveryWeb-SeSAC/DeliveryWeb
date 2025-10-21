'use client'
import { getFood } from "@/api/menuAPI"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function MenuDetail(){

    const {id, name} = useParams()  // pathVariable 값을 가져올 수 있다 /meun/[id]

    const [menu,setMenu] = useState()

    useEffect(() => {
        setMenu(getFood(id,name))
    }, [])

    return(
        menu && 
        <>
            <h1>{menu.name} 상세 페이지</h1>
            <h3>메뉴 가격: {menu.menuPrice}</h3>
            <h3>메뉴 종류: {menu.categoryName}</h3>
            <h3>메뉴 설명: {menu.detail.description}</h3>
            <img src={menu.image} style={{maxWidth: 500}}/>
        </>  
    )
}