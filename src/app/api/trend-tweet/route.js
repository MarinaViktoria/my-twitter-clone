import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/lib/models/Tweet";
import { Like } from "@/lib/models/Like";

export async function GET() {
  await makeSureDbIsReady();

  const mostLikedTweet = await Like.findOne().sort({ likes: -1 }).limit(1);

  if (!mostLikedTweet || !mostLikedTweet.tweetId) {
    return NextResponse.json(
      { error: "No liked tweets found" },
      { status: 404 }
    );
  }

  const tweet = await Tweet.findById(mostLikedTweet.tweetId);

  if (!tweet) {
    return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
  }

  return NextResponse.json(tweet);
}
