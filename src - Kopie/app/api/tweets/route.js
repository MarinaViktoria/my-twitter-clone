import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "../../../../lib/db";
import { Tweet } from "../../../../lib/models/Tweet";

export async function GET() {
  await makeSureDbIsReady();
  try {
    const tweets = await Tweet.find({}).sort({ createdAt: -1 });
    //const tweets = await Tweet.find({}).sort({createdAt: -1})); //descending(newest first) //+1(latest fürst)
    return NextResponse.json({ tweets }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tweets" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await makeSureDbIsReady();

  try {
    const { name, text } = await req.json();

    if (!name || !text) {
      return NextResponse.json(
        { error: "Name and text are required." },
        { status: 400 }
      );
    }

    const newTweet = await Tweet.create({ name, text });

    return NextResponse.json(newTweet, { status: 201 });
  } catch (err) {
    console.error("Tweet creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create tweet." },
      { status: 500 }
    );
  }
}
/*
    //CREATE
    //tweets is an ORM object, we can convert it to a normal object by calling
    const tweets = await Tweet.create({
    name: "Isabella",
    text: "What a wonderful day!",
    });
    tweets.toObject();
    */
//READ
//const tweets = await Tweet.find({ name: "Isabella" });

//UPDATE
/*
    const tweets = await Tweet.findOne({ name: "Isabella" });
    tweets.text = "It's a horrible weather!";
    await tweets.save();*/

//DELETE
/*
    const tweets = await Tweet();
    await Tweet.findOneAndDelete({ name: "Isabella" });
    await Tweet.findOneAndDelete({ name: "Maria" });
    */
