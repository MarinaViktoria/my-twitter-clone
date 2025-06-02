"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostTweetPage() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, text }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Failed to post tweet");
        return;
      }

      // Erfolg – zurück zur Startseite
      router.push("/");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-blue-300 rounded">
      <h1 className="text-xl font-bold mb-4">Post a New Tweet</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="border p-2"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          Tweet it!
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
