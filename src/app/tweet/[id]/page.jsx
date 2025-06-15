"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
//import ButtonLike from "components/ButtonLike";

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

    
      <div className="flex justify-center mt-8 p-6">
        <Link
          href="/"
          className="text-blue-600 underline text-center transition-all duration-300 ease-in-out hover:text-blue-800 hover:-translate-y-0.5"
        >
          ← Back to Feed
        </Link>
      </div>
    </div>
  );
}
