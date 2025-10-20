// layout.js 01
export const metadata = {
  title: "SNS 그룹 & 친구 리스트",
  description: "SNS 그룹 목록 및 친구 상태 표시 기능",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
