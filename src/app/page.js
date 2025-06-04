import TypingWelcome from "components/TypingWelcome";
import ButtonTweet from "components/ButtonTweet";
import TweeterCard from "components/TweeterCard";
import Link from "next/link";

async function getTweets() {
  const res = await fetch("http://localhost:3000/api/tweets", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data.tweets || [];
}

export default async function Home() {
  const tweets = await getTweets();

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-20">
      <main className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <TypingWelcome />

          <h4 className="text-gray-600 max-w-2xl mx-auto px-4 mb-6 sm:mb-8">
            Share your thoughts and ideas. Explore trending tweets. Connect with
            the world.
          </h4>

          <ButtonTweet />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-16 w-full max-w-8xl p-4">
          <div className="flex-1 border border-blue-300 rounded-lg p-4">
            <h1 className="text-xl font-bold mb-4 hover:text-blue-400 transition duration-200">
              <Link href="/explore">Explore Tweets</Link>
            </h1>
            <ul>
              {tweets.slice(0, 3).map((tweet) => (
                <li key={tweet._id}>
                  <Link href={`tweet/${tweet._id}`}>
                    <TweeterCard tweet={tweet} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="border border-blue-300 rounded p-4 h-64 lg:h-112">
              <h2>Hier ist Platz für Trends!!!</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
