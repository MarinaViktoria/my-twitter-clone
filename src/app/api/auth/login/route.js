import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "lib/db";
import { User } from "lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

///
import { serialize } from "cookie";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    await makeSureDbIsReady();

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
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
