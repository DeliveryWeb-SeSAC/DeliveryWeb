import Link from "next/link"
import itemStyle from "./MenuItem.module.css"

export default function MenuItem({menu}) {
    return (
        <Link href={`/menu/${id}/${menu.name}`}>
            <div className={itemStyle.MenuItem}>
                <h3>메뉴명 : {menu.name}</h3>
                <h3>가격 : {menu.price}</h3>
                <h3>칼로리 : {menu.kcal}</h3>
                <h3>메뉴설명 : {menu.desc}</h3>
            </div>
        </Link>
    )
}