'use client'
import { getStoreById } from "@/app/api/storeAPI/route"
import Menu from "@/app/menu/page"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function StoreDetail(){

    const {id} = useParams()  // pathVariable 값을 가져올 수 있다 /meun/[id]

    const [store,setStore] = useState()

    useEffect(() => {
        setStore(getStoreById(id))
    }, []);

    return(
        store && 
        <>
            <div>{store.logo}{store.name}</div>
            <div>{store.address}</div>
            <div>{store.star}</div>
            <div>{store.delivery}</div>
            <hr/>
            <Menu id={store.id} getMenu={store.foods}/>
        </>  
    )
}