"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostTweetPage() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName(" ");
    setText(" ");
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
    <>
      <div className="max-w-md mx-auto mt-20 p-6 border border-blue-300 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Post a New Tweet
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="border p-2"
            type="text"
            placeholder="Your name"
            value={name}
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="border p-2"
            placeholder="What's on your mind?"
            value={text}
            spellCheck={false}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            required
          />
          <button
            type="submit"
            className="mt-4 cursor-pointer bg-blue-400 text-white p-2 rounded hover:bg-blue-500"
          >
            Tweet it!
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      <div className="flex justify-center mt-8 p-6">
        <Link
          href="/"
          className="text-blue-600 underline text-center transition-all duration-300 ease-in-out hover:text-blue-800 hover:-translate-y-0.5"
        >
          ← Back to Feed
        </Link>
      </div>
    </>
  );
}
