// layout.js
export const metadata = {
  title: "고객 상담 채팅",
  description: "간단한 고객 상담용 채팅 예시 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
