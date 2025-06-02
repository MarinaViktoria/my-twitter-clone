import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "../../../../../lib/db";
import { Tweet } from "../../../../../lib/models/Tweet";

export async function GET(_req, { params }) {
  await makeSureDbIsReady();

  try {
    const tweet = await Tweet.findById(params.id);

    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    return NextResponse.json(tweet);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tweet" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  await makeSureDbIsReady();

  const tweetDeleted = await Tweet.findByIdAndDelete(params.id);
  return NextResponse.json(tweetDeleted);
}
