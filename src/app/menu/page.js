'use client';
import MenuItem from "@/app/menu/item/MenuItem";
import boxStyle from "./item/MenuItem.module.css"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

export default function Menu({id, getMenu}) {
    const [menuList, setMenuList] = useState([])
    // const [searchValue, setSearchValue] = useState('')

    const router = useRouter() //next/navigation 임포트!

    useEffect(() => {
        setMenuList(getMenu)
    }, [])

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value)
    }

    const onClickHandler = () =>{
        router.push(`/menu/search?menuName=${searchValue}`) // URL을 변경해서 다른 페이지로 이동
    }

    return (
        <>
            <h1>메뉴 페이지 입니다.</h1>
            {/* <div>
                <input
                    type="search"
                    name="menuName"
                    value={searchValue}
                    onChange={onChangeHandler}
                />
                <button onClick={onClickHandler}>검색</button>
            </div> */}
            <div className={boxStyle.MenuBox}>
                {menuList.map(menu => <MenuItem key={menu.name} id={id} menu={menu}/>)}
            </div>
        </>
    )
}