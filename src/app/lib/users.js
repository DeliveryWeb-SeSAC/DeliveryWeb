import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "app", "data", "user-info.json");

export async function readUsers() {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function writeUsers(users) {
  await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2), "utf-8");
}