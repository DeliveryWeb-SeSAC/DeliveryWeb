import Header from './Header'
import LoginPage from '@/app/login/page'
import ChatPage from '@/app/chat/page'
import SNSListPage from '@/app/msg/page'
import CartPage from '@/app/cart/page'

export default function Layout({children}){
    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <LoginPage/>
                    <SNSListPage/>
                </div>
                <div style={{flex: 2}}>
                    {children}
                </div>
                <div style={{flex: 1}}>
                    <ChatPage/>
                    <CartPage />
                </div>
            </div>
        </>
    )
}