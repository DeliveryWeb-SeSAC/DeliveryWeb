"use client";
import style from "./mypage.module.css"
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function MyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // 초기 로드
  useEffect(() => {
    if (!email) return;
    (async () => {
      const res = await fetch(`/api/users/${encodeURIComponent(email)}`);
      if (!res.ok) return alert("유저 정보를 불러올 수 없습니다.");
      setUser(await res.json());
    })();
  }, [email]);

  if (!email) return <p>email 파라미터가 없습니다.</p>;
  if (!user) return <p>로딩중...</p>;

  const updateField = (k, v) => setUser(u => ({ ...u, [k]: v }));

  const save = async () => {
    setSaving(true);
    const res = await fetch(`/api/users/${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // 필요한 필드만 보낼 것
        name: user.name,
        phone: user.phone,
        birth: user.birth,
        address1: user.address1,
        address2: user.address2 || undefined,
        address3: user.address3 || undefined,
      })
    });
    setSaving(false);
    if (!res.ok) return alert(`저장 실패: ${await res.text()}`);
    const updated = await res.json();
    setUser(updated);
    alert("저장되었습니다.");
    router.push(`/login/success?email=${encodeURIComponent(user.email)}`);
  };

  return (
    <>
      <div className={style.page}>
        <div className={style.card}>
          <h1 className={style.title}>마이페이지</h1>
          <p className={style.meta}><b>아이디:</b> {user.email}</p>

          <div className={style.form}>
            <label className={style.span2}>
              이름
              <input className={style.input} value={user.name}
                onChange={e => updateField("name", e.target.value)} />
            </label>

            <label>
              생년월일
              <input className={style.input} type="date" value={user.birth}
                onChange={e => updateField("birth", e.target.value)} />
            </label>

            <label>
              전화번호
              <input className={style.input} value={user.phone}
                onChange={e => updateField("phone", e.target.value)} />
            </label>

            <label className={style.span2}>
              주소1
              <input className={style.input} value={user.address1}
                onChange={e => updateField("address1", e.target.value)} />
            </label>

            <label className={style.span2}>
              주소2(옵션)
              <input className={style.input} value={user.address2 || ""}
                onChange={e => updateField("address2", e.target.value)} />
            </label>

            <label className={style.span2}>
              주소3(옵션)
              <input className={style.input} value={user.address3 || ""}
                onChange={e => updateField("address3", e.target.value)} />
            </label>

            <div className={style.actions}>
              <button className={style.button} onClick={save} disabled={saving}>
                {saving ? "저장중..." : "회원 정보 수정하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}