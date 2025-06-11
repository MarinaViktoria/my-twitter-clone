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
    <nav className="flex flex-wrap gap-4 md:gap-6 md:flex-grow md:justify-between text-xl">
      {/* Navigation Links */}
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

      {/* Auth Section */}
      <div className="flex items-center space-x-6">
        {isLoading ? (
          // Loading state
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
        ) : user ? (
          // Logged in - Show user info and logout
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">
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
          <div className="flex items-center space-x-6">
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
