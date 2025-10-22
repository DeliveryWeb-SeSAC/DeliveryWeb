"use client"
import Header from './Header'
import LoginPage from '@/app/login/page'  // 이 컴포넌트에서 login.module.css import
import ChatPage from '@/app/chat/page'    // 이 컴포넌트에서 chat.module.css import
import SNSListPage from '@/app/msg/page'  // 이 컴포넌트에서 SNS.module.css import (msg/page.jsx 가정)
import CartPage from '@/app/cart/page'    // 이 컴포넌트에서 cart.module.css import
import styles from './layout.module.css'  // Layout 전용 CSS

export default function Layout({children}) {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.leftSidebar}>
                    <div className={styles.sidebarChild}>  {/* 오버플로우 자동 조정 상속 */}
                        <LoginPage />  {/* 내부에서 .title, .input 등 login.module.css 클래스 사용 */}
                    </div>
                    <div className={styles.sidebarChild}>
                        <SNSListPage />  {/* 내부에서 .title, .snsItem 등 SNS.module.css 클래스 사용 */}
                    </div>
                </div>
                <div className={styles.mainContent}>
                    {children}
                </div>
                <div className={styles.rightSidebar}>
                    <div className={styles.sidebarChild}>
                        <ChatPage />  {/* 내부에서 .title, .messageBubble 등 chat.module.css 클래스 사용 */}
                    </div>
                    <div className={styles.sidebarChild}>
                        <CartPage />  {/* 내부에서 .title, .cartItem 등 cart.module.css 클래스 사용 */}
                    </div>
                </div>
            </div>
        </>
    )
}