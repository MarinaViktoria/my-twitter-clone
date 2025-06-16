"use client";

import { useEffect, useState } from "react";

export default function ButtonLike({ tweetId }) {
  const [likes, setLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    fetch(`/api/likes/${tweetId}`)
      .then((res) => res.json())
      .then((data) => setLikes(data.likes))
      .catch((err) => console.error("Fehler beim Laden der Likes:", err));
  }, [tweetId]);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      const res = await fetch(`/api/likes/${tweetId}`, { method: "POST" });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setLikes(data.likes);
    } catch (err) {
      console.error("Error while liking:", err);
    }
    setIsLiking(false);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
      disabled={isLiking}
      className="cursor-pointer mt-2 inline-flex items-center bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 text-sm"
    >
      👍 {likes}
    </button>
  );
}
