import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  likes: { type: Number, required: false, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const Like = mongoose.models.Like ?? mongoose.model("Like", LikeSchema);
