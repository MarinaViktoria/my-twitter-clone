import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  tweetId: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const Like = mongoose.models.Like ?? mongoose.model("Like", LikeSchema);
