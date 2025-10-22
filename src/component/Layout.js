"use client"
import Header from './Header'
import LoginPage from '@/app/login/page'
import ChatPage from '@/app/chat/page'
import SNSListPage from '@/app/msg/page'
import CartPage from '@/app/cart/page'
import Store from '@/app/store/page'
import { usePathname } from 'next/navigation'


export default function Layout({children}){
    const pathname = usePathname()
    const isLoginSuccess = pathname?.includes('/login/success')
    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    {isLoginSuccess ? children : <LoginPage/>}
                    <SNSListPage/>
                </div>
                <div style={{flex: 2}}>
                    {/* {!isLoginSuccess && children} */}
                    <Store/>
                </div>
                <div style={{flex: 1}}>
                    <ChatPage/>
                    <CartPage />
                </div>
            </div>
        </>
    )
}