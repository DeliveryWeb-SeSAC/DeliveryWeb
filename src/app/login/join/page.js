"use client";
import style from "./join.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Join() {
  const [form, setForm] = useState({
    email: "", password: "", name: "",
    birth: "", phone: "",
    address1: "", address2: "", address3: ""
  });
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);

  const onChange = e => setForm(v => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    // 중복 체크 안 한 경우
    if (isEmailAvailable !== true) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      alert(`가입 실패: ${await res.text()}`);
      return;
    }

    const user = await res.json();
    alert("회원가입이 완료되었습니다!");
    router.push(`/`);
  };

  const handleCheckDuplication = async () => {
    if (!form.email.trim()) {
      alert("이메일을 입력하세요.");
      return;
    }
    setIsChecking(true);

    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        alert("사용자 목록을 불러올 수 없습니다.");
        return;
      }

      const users = await res.json();
      const duplicate = users.find(u => u.email === form.email.trim());

      if (duplicate) {
        alert("이미 가입된 이메일입니다.");
        setIsEmailAvailable(false);
      } else {
        alert("사용 가능한 이메일입니다!");
        setIsEmailAvailable(true);
      }
    } catch (err) {
      console.error("중복 확인 오류:", err);
      alert("서버 오류가 발생했습니다.");
    } finally {
      setIsChecking(false);
    }
  };


  return (
    <div className={style.page}>
      <form onSubmit={onSubmit} className={style.card}>
        <h1 className={style.title}>회원가입</h1>

        <div className={style.form}>
          <label className={style.span2}>
            이메일
            <input id="email" name="email" type="email"
              value={form.email} onChange={onChange}
              placeholder="email" required className={style.input} />
            <button
              type="button"
              onClick={handleCheckDuplication}
              disabled={isChecking}
              style={{ flexShrink: 0, padding: "8px 10px", whiteSpace: "nowrap" }}
            >
              {isChecking ? "확인중..." : "중복확인"}
            </button>
          </label>


          {isEmailAvailable === true && (
            <p style={{ color: "green", fontSize: "0.9rem" }}>사용 가능한 이메일입니다.</p>
          )}
          {isEmailAvailable === false && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>이미 가입된 이메일입니다.</p>
          )}

          <label className={style.span2}>
            비밀번호
            <input id="password" name="password" type="password"
              value={form.password} onChange={onChange}
              placeholder="password" required className={style.input} />
          </label>

          <label>
            이름
            <input id="name" name="name" value={form.name}
              onChange={onChange} placeholder="name" required
              className={style.input} />
          </label>

          <label>
            생년월일
            <input id="birth" name="birth" type="date"
              value={form.birth} onChange={onChange} required
              className={style.input} />
          </label>

          <label className={style.span2}>
            전화번호
            <input id="phone" name="phone" value={form.phone}
              onChange={onChange} placeholder="010-0000-0000" required
              className={style.input} />
          </label>

          <label className={style.span2}>
            주소1
            <input id="address1" name="address1" value={form.address1}
              onChange={onChange} placeholder="주소1" required
              className={style.input} />
          </label>

          <label className={style.span2}>
            주소2 (옵션)
            <input id="address2" name="address2" value={form.address2}
              onChange={onChange} placeholder="주소2(옵션)"
              className={style.input} />
          </label>

          <label className={style.span2}>
            주소3 (옵션)
            <input id="address3" name="address3" value={form.address3}
              onChange={onChange} placeholder="주소3(옵션)"
              className={style.input} />
          </label>

          <div className={style.actions}>
            <button type="submit" className={style.button}>가입</button>
          </div>
        </div>
      </form>
    </div>
  );
}