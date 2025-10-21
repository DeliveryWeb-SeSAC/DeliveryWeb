'use client'
import { getFood } from "@/app/api/menuAPI/route"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function MenuDetail(){

    const searchParams = useSearchParams()  // pathVariable 값을 가져올 수 있다 /meun/[id]

    const id = searchParams.get('id')
    const name = searchParams.get('name')

    const [menu,setMenu] = useState()

    useEffect(() => {
        console.log(`MenuDetail: ${id} ${name}`)
        setMenu(getFood(id,name))
    }, [])

    return(
        menu && 
        <>
            <h1>{menu.name} 상세 페이지</h1>
            <h3>메뉴 가격: {menu.menuPrice}</h3>
            <h3>메뉴 종류: {menu.categoryName}</h3>
            <h3>메뉴 설명: {menu.desc}</h3>
            <img src={menu.image} style={{maxWidth: 500}}/>
        </>  
    )
}