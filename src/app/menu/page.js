'use client';
import MenuItem from "@/app/menu/item/MenuItem";
import boxStyle from "./item/MenuItem.module.css"
import { useState, useEffect } from "react"

export default function Menu({id, getMenu}) {
    const [menuList, setMenuList] = useState([])

    useEffect(() => {
        setMenuList(getMenu)
    }, [])

    return (
        <>
            <h1>메뉴 페이지 입니다.</h1>
            <div className={boxStyle.MenuBox}>
                {menuList.map(menu => <MenuItem key={menu.name} id={id} menu={menu}/>)}
            </div>
        </>
    )
}