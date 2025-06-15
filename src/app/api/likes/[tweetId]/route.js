import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "lib/db";
import { Like } from "@/lib/models/Like";

export async function GET(_req, context) {
  try {
    await makeSureDbIsReady();

    const { tweetId } = await context.params;
    console.log("Tweet ID Type:", typeof tweetId, tweetId);

    const like = await Like.findOne({ tweetId });
    console.log("Like found:", like);

    return NextResponse.json({ likes: like?.likes ?? 0 });
  } catch (error) {
    console.error("GET /api/likes/[tweetId] Fehler:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}

export async function POST(_req, context) {
  try {
    await makeSureDbIsReady();

    const { tweetId } = await context.params;
    console.log("Tweet ID Type:", typeof tweetId, tweetId);

    const like = await Like.findOneAndUpdate(
      { tweetId },
      { $inc: { likes: 1 } },
      { new: true, upsert: true }
    );
    console.log("Like after Update:", like);

    return NextResponse.json({ likes: like?.likes ?? 0 });
  } catch (error) {
    console.error("POST /api/likes/[tweetId] Fehler:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
