import Link from "next/link"
import itemStyle from "./MenuItem.module.css"

export default function MenuItem({id,menu}) {
    return (
        <>
            <Link href={`/menu/${id}/${menu.name}`}>
                <div className={itemStyle.MenuItem}>
                    <h3>메뉴명 : {menu.name}</h3>
                </div>
            </Link>
            <button>장바구니 담기</button>
        </>
    )
}