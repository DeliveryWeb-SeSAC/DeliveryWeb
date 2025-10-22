import Header from './Header';
import LoginPage from '@/app/login/page';  // 로그인 폼 + 성공 UI 통합 (login.module.css & success.module.css import)
import ChatPage from '@/app/chat/page';    // 채팅 페이지 (chat.module.css import)
import SNSListPage from '@/app/msg/page';  // SNS 목록 페이지 (page.module.css import)
import CartPage from '@/app/cart/page';    // 장바구니 페이지 (cart.module.css import)
import styles from './layout.module.css';  // Layout 전용 CSS (반응형, sticky 등) 1

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.sidebarChild}>  {/* 오버플로우 자동 조정 + sticky 상속 */}
            <LoginPage />  {/* 내부 CSS 클래스 자동 적용 (로그인 성공 시 success UI 표시) */}
          </div>
          <div className={styles.sidebarChild}>
            <SNSListPage />
          </div>
        </div>
        <div className={styles.mainContent}>
          {children}  {/* 중앙 콘텐츠: 로그인 성공 후에도 유지 (e.g., 대시보드) */}
        </div>
        <div className={styles.rightSidebar}>
          <div className={styles.sidebarChild}>
            <ChatPage />
          </div>
          <div className={styles.sidebarChild}>
            <CartPage />
          </div>
        </div>
      </div>
    </>
  );
}