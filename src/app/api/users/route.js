import { readUsers, writeUsers } from "../../lib/users";

export async function GET() {
  const users = await readUsers();
  return Response.json(users);
}

export async function POST(req) {
  const body = await req.json();
  const {
    email, password, name, birth, phone,
    address1, address2, address3
  } = body;

  // 필수값 검증
  if (!email || !password || !name || !birth || !phone || !address1) {
    return new Response("missing required fields", { status: 400 });
  }

  const users = await readUsers();
  if (users.some(u => u.email === email)) {
    return new Response("email already exists", { status: 409 });
  }

  const newUser = { email, password, name, birth, phone, address1 };
  if (address2) newUser.address2 = address2;
  if (address3) newUser.address3 = address3;

  users.push(newUser);
  await writeUsers(users);

  return Response.json(newUser, { status: 201 });
}