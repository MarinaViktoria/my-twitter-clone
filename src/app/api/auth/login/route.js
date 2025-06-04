import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "lib/db";
import { User } from "lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await makeSureDbIsReady();

  const { username, password } = await req.json();

  //1. find user
  const user = await User.findOne({ username });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  //2. compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  //3. generate jwt
  //https://jwtsecret.com/generate
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  //4. set cookie
  const res = NextResponse.json({ message: "Logged In" });
  res.cookies.set("authToken", token, { httpOnly: true, path: "/" });
  return res;
}
