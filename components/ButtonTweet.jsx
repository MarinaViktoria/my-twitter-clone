"use client";
import { useRouter } from "next/navigation";

export default function ButtonTweet() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/post")}
      className="cursor-pointer mx-auto border bg-blue-300 text-white py-2 px-6 mb-16 hover:bg-blue-400 transition duration-200"
    >
      Start tweeting
    </button>
  );
}
