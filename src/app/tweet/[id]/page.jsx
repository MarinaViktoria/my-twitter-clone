"use client";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TweetDetail({ params }) {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTweet() {
      try {
        const res = await fetch(`/api/tweet-single/${id}`);
        const data = await res.json();
        setTweet(data);
      } catch (error) {
        console.error("Loading ist incorrect:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTweet();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading Tweet...</p>;
  if (!tweet || tweet.error)
    return <p className="text-center mt-8">Tweet is not found.</p>;

  return (
    <div className="flex flex-col items-center mt-8 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{tweet.name}</h1>
      <p className="mb-4">{tweet.text}</p>

      <Link
        className="mt-8"
        href="/"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        ← Back to Feed
      </Link>
    </div>
  );
}
