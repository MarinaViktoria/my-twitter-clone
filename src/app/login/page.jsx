"use client";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password }),
      });

      if (res.ok) {
        router.push("/"); // weiterleiten, weil erfolgreich
      } else {
        const errorText = await res.text();
        console.error("Server error response:", errorText);
        let errorMessage = "Login fehlgeschlagen";

        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch (err) {
          console.warn("Antwort war kein gültiges JSON:", err);
        }

        setError(errorMessage);
      }
    } catch (err) {
      setError("Netzwerkfehler oder Server nicht erreichbar");
      console.error(err);
    }
  }

  return (
    <div>
      <div>
        <h1>Hello {user ? user.username : "Stranger"}</h1>
      </div>

      <div className="max-w-md mx-auto mt-20 p-6 border border-blue-300 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2"
            required
          />
          <button
            type="submit"
            className="mt-4 cursor-pointer bg-blue-400 text-white p-2 rounded hover:bg-blue-500"
          >
            Log in
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
