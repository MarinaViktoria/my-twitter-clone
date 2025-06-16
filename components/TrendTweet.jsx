"use client";

import { useEffect, useState } from "react";

export default function TrendTweet() {
  const [tweet, setTweet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavouriteTweet = async () => {
      try {
        const res = await fetch("/api/trend-tweet");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setTweet(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getFavouriteTweet();
  }, []);

  if (error) return <p className="text-red-500">Fehler: {error}</p>;
  if (!tweet)
    return <p className="text-gray-500">Lade beliebtesten Tweet...</p>;

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-semibold text-lg mb-2">🔥 Most Liked Tweet</h2>
      <p className="text-l text-gray-700 mb-1">{tweet.text}</p>
      <p className="text-l text-gray-500">User: @{tweet.name || "Unknown"}</p>
    </div>
  );
}
