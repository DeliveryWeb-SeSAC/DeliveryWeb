import { readUsers, writeUsers } from "../../../lib/users";
function decodeEmail(params) {
  return decodeURIComponent(params.email);
}

export async function GET(_req, { params }) {
  const email = decodeEmail(params);
  const users = await readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return new Response("not found", { status: 404 });
  return Response.json(user);
}

export async function PATCH(req, { params }) {
  const email = decodeEmail(params);
  const patch = await req.json(); // 변경할 필드만 보내기
  const users = await readUsers();
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) return new Response("not found", { status: 404 });

  // 허용 필드만 머지
  const allowed = ["password", "name", "birth", "phone", "address1", "address2", "address3"];
  for (const k of Object.keys(patch)) {
    if (allowed.includes(k)) users[idx][k] = patch[k];
  }

  await writeUsers(users);
  return Response.json(users[idx]);
}

export async function DELETE(_req, { params }) {
  const email = decodeEmail(params);
  const users = await readUsers();
  const next = users.filter(u => u.email !== email);
  if (next.length === users.length) return new Response("not found", { status: 404 });
  await writeUsers(next);
  return new Response(null, { status: 204 });
}