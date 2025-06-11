import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  const res = new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
  });

  res.headers.set("Set-Cookie", cookie);

  return res;
}
