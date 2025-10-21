// page.js 01
"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function SNSListPage() {
  const [friends] = useState([
    { name: "김철수", status: "온라인", online: true },
    { name: "이영희", status: "오프라인", online: false },
    { name: "박민준", status: "온라인", online: true },
    { name: "최지은", status: "온라인", online: true },
    { name: "정하늘", status: "오프라인", online: false },
  ]);

  const [groups, setGroups] = useState([
    { name: "가족 그룹", members: ["엄마", "아빠", "형제1", "형제2", "나"], status: "활성", open: false },
    { name: "친구 모임", members: ["친구A", "친구B", "친구C"], status: "비활성", open: false },
    { name: "직장 동료", members: ["동료1", "동료2", "동료3", "동료4"], status: "활성", open: false },
    { name: "취미 클럽", members: ["멤버1", "멤버2", "멤버3"], status: "활성", open: false },
    { name: "여행 그룹", members: ["여행자A", "여행자B"], status: "비활성", open: false },
  ]);

  const toggleGroup = (index) => {
    setGroups((prev) =>
      prev.map((g, i) => (i === index ? { ...g, open: !g.open } : g))
    );
  };

  const handleFriendClick = (name) => {
    alert(`"${name}" 친구 채팅을 시작합니다!`);
  };

  return (
    // <div className={styles.listContainer}>
    <div>
      <div id="group-header" className={styles.sectionHeader}>
        그룹 목록
      </div>
      <div className={styles.sectionItems}>
        {groups.map((group, i) => (
          <div key={i} className={styles.item} onClick={() => toggleGroup(i)}>
            <div className={styles.itemInfo}>
              <p className={styles.itemName}>{group.name}</p>
              <p className={styles.itemStatus}>
                멤버: {group.members.length}명 - {group.status}
              </p>
            </div>
            {group.open && (
              <div className={styles.membersSub}>
                {group.members.map((m, j) => (
                  <div key={j} className={styles.memberItem}>
                    - {m}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.sectionHeader}>친구 목록</div>
      <div className={styles.sectionItems}>
        {friends.map((friend, i) => (
          <div
            key={i}
            className={styles.item}
            onClick={() => handleFriendClick(friend.name)}
          >
            <div className={styles.itemInfo}>
              <p className={styles.itemName}>{friend.name}</p>
              <p className={styles.itemStatus}>{friend.status}</p>
            </div>
            <div
              className={`${styles.statusIndicator} ${
                friend.online ? styles.online : styles.offline
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
