import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "lib/db";
import { User } from "lib/models/User";

export async function POST(req) {
  await makeSureDbIsReady();

  const { username, password } = await req.json();
  const user = await User.create({ username, password });
  return NextResponse.json({ id: user._id, username: user.username });
}
