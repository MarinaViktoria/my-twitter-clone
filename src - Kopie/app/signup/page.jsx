"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Signup failed");
        return;
      }
      router.push("/login");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-blue-300 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign up</h1>

      <form onSubmit={handleSignup} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2"
        ></input>

        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2"
        ></input>

        <button
          type="submit"
          className="mt-4 cursor-pointer bg-blue-400 text-white p-2 rounded hover:bg-blue-500"
        >
          Create Account
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
