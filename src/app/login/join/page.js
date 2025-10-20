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
      <input name="email" value={form.email} onChange={onChange} placeholder="email" required />
      <input name="password" type="password" value={form.password} onChange={onChange} placeholder="password" required />
      <input name="name" value={form.name} onChange={onChange} placeholder="name" required />
      <input name="birth" type="date" value={form.birth} onChange={onChange} required />
      <input name="phone" value={form.phone} onChange={onChange} placeholder="010-0000-0000" required />
      <input name="address1" value={form.address1} onChange={onChange} placeholder="주소1" required />
      <input name="address2" value={form.address2} onChange={onChange} placeholder="주소2(옵션)" />
      <input name="address3" value={form.address3} onChange={onChange} placeholder="주소3(옵션)" />
      <button type="submit">가입</button>
    </form>
  );
}