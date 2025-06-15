import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "../../../../../lib/db";
import { Tweet } from "../../../../../lib/models/Tweet";

export async function GET(_req, context) {
  await makeSureDbIsReady();

  try {
    const id = context.params.id;
    const tweet = await Tweet.findById(id);

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

export async function DELETE(_req, context) {
  await makeSureDbIsReady();

  const id = context.params.id;

  const tweetDeleted = await Tweet.findByIdAndDelete(id);
  return NextResponse.json(tweetDeleted);
}
