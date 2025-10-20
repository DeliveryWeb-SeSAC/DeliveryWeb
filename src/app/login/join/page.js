"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Join() {
  const [form, setForm] = useState({
    email: "", password: "", name: "",
    birth: "", phone: "",
    address1: "", address2: "", address3: ""
  });
  const router = useRouter();

  const onChange = e => setForm(v => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
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
    router.push(`/login/success?email=${encodeURIComponent(user.email)}`);
  };

return (
  <form onSubmit={onSubmit}>
    <label htmlFor="email">이메일</label><br />
    <input
      id="email"
      name="email"
      type="email"
      value={form.email}
      onChange={onChange}
      placeholder="email"
      required
    />
    <br /><br />

    <label htmlFor="password">비밀번호</label><br />
    <input
      id="password"
      name="password"
      type="password"
      value={form.password}
      onChange={onChange}
      placeholder="password"
      required
    />
    <br /><br />

    <label htmlFor="name">이름</label><br />
    <input
      id="name"
      name="name"
      value={form.name}
      onChange={onChange}
      placeholder="name"
      required
    />
    <br /><br />

    <label htmlFor="birth">생년월일</label><br />
    <input
      id="birth"
      name="birth"
      type="date"
      value={form.birth}
      onChange={onChange}
      required
    />
    <br /><br />

    <label htmlFor="phone">전화번호</label><br />
    <input
      id="phone"
      name="phone"
      value={form.phone}
      onChange={onChange}
      placeholder="010-0000-0000"
      required
    />
    <br /><br />

    <label htmlFor="address1">주소1</label><br />
    <input
      id="address1"
      name="address1"
      value={form.address1}
      onChange={onChange}
      placeholder="주소1"
      required
    />
    <br /><br />

    <label htmlFor="address2">주소2 (옵션)</label><br />
    <input
      id="address2"
      name="address2"
      value={form.address2}
      onChange={onChange}
      placeholder="주소2(옵션)"
    />
    <br /><br />

    <label htmlFor="address3">주소3 (옵션)</label><br />
    <input
      id="address3"
      name="address3"
      value={form.address3}
      onChange={onChange}
      placeholder="주소3(옵션)"
    />
    <br /><br />

    <button type="submit">가입</button>
  </form>
);
}