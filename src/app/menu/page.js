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
        <div className={boxStyle.menuPageContainer}>
            <h1>메뉴</h1>
            <div className={boxStyle.menuGrid}>
                {menuList.map(menu => <MenuItem key={menu.name} id={id} menu={menu}/>)}
            </div>
        </div>
    )
}