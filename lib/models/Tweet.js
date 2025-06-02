import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, required: false, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
});

// we have to define it this way because of hot reloading
export const Tweet =
  mongoose.models.Tweet ?? mongoose.model("Tweet", TweetSchema);
