import { readUsers, writeUsers } from "../../../lib/users";

function decodeEmail(email) {
  return decodeURIComponent(email);
}

// GET
export async function GET(_req, context) {
  const { email } = await context.params; // ✅ 반드시 await
  const decoded = decodeEmail(email);

  const users = await readUsers();
  const user = users.find(u => u.email === decoded);
  if (!user) return new Response("not found", { status: 404 });
  return Response.json(user);
}

// PATCH
export async function PATCH(req, context) {
  const { email } = await context.params; // ✅ 반드시 await
  const decoded = decodeEmail(email);

  const patch = await req.json();
  const users = await readUsers();
  const idx = users.findIndex(u => u.email === decoded);
  if (idx === -1) return new Response("not found", { status: 404 });

  const allowed = ["password", "name", "birth", "phone", "address1", "address2", "address3"];
  for (const k of Object.keys(patch)) {
    if (allowed.includes(k)) users[idx][k] = patch[k];
  }

  await writeUsers(users);
  return Response.json(users[idx]);
}

// DELETE
export async function DELETE(_req, context) {
  const { email } = await context.params; // ✅ 반드시 await
  const decoded = decodeEmail(email);

  const users = await readUsers();
  const next = users.filter(u => u.email !== decoded);
  if (next.length === users.length) return new Response("not found", { status: 404 });

  await writeUsers(next);
  return new Response(null, { status: 204 });
}