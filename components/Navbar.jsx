"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../src/app/context/AuthContext";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="text-xl flex flex-col gap-2 md:flex-row md:items-center md:justify-between w-full">
      {/* Navigation Links */}
      <div className="flex flex-col gap-2 md:flex-row md:gap-12 items-start md:items-center md:mx-auto">
        <Link href="/" className="hover:text-blue-400 transition duration:200">
          Home
        </Link>
        <Link
          href="/explore"
          className="hover:text-blue-400 transition duration:200"
        >
          Explore Tweets
        </Link>
        <Link
          href="/post"
          className="hover:text-blue-400 transition duration:200"
        >
          Post a Tweet
        </Link>
      </div>

      {/* Auth Section */}
      <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
        {isLoading ? (
          // Loading state
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
        ) : user ? (
          // Logged in - Show user info and logout
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <span className="text-sm text-gray-700 bg-white px-2 py-1 rounded">
              Hello, {user.username}!
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          // Not logged in - Show login/signup
          <div className="flex flex-col items-start gap-2 md:flex-row md:gap-4">
            <Link
              href="/login"
              className="hover:text-blue-400 transition duration:200"
            >
              LogIn
            </Link>
            <Link
              href="/signup"
              className="hover:text-blue-400 transition duration:200"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
