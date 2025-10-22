// page.js
"use client";

import styles from './page.module.css';
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "상담원: 안녕하세요! 도와드릴까요?" },
  ]);
  const [input, setInput] = useState("");

  const responses = {
    주문: "주문 내역을 확인하려면 '주문 내역' 메뉴를 클릭하세요. 추가 도움이 필요하세요?",
    배달: "배달 시간은 보통 30-45분 정도 소요됩니다. 현재 위치를 확인해주세요.",
    쿠폰: "쿠폰은 '쿠폰' 메뉴에서 확인할 수 있습니다. 새로운 쿠폰을 원하시나요?",
    문제: "문제가 발생했나요? 자세한 내용을 알려주세요. 도와드리겠습니다.",
    안녕: "안녕하세요! 어떤 도움이 필요하세요?",
    추천: "지금 시간대에 ㅇㅇㅇ 가게의 메뉴를 추천드립니다.",
  };

  const defaultResponse =
    "죄송합니다, 더 자세히 말씀해주세요. 주문, 배달, 쿠폰 등에 대해 물어보세요.";

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: `나: ${input}` };

    let botText = defaultResponse;
    for (const key in responses) {
      if (input.includes(key)) {
        botText = responses[key];
        break;
      }
    }

    const botMessage = { sender: "bot", text: `상담원: ${botText}` };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={styles.chatSection}>
      <h3>고객 상담</h3>
      <div className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <p
            key={index}
            className={
              msg.sender === "user" ? styles.userMsg : styles.botMsg
            }
          >
            {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="메시지 입력..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSend}>보내기</button>
    </div>
  );
}
