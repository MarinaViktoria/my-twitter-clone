import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const Comment =
  mongoose.models.Comment ?? mongoose.model("Comment", CommentSchema);
