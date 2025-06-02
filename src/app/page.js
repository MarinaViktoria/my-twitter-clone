//import ButtonTweet from "../components/ButtonTweet";
import ButtonTweet from "../../components/ButtonTweet";
import TweeterCard from "../../components/TweeterCard";
import Link from "next/link";

async function getTweets() {
  const res = await fetch("http://localhost:3000/api/tweets", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.tweets || [];
}

export default async function Home() {
  const tweets = await getTweets();

  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <h1 className="mx-auto text-2xl font-bold mb-4 mt-8">
          Welcome to T-witter
        </h1>
        <h4 className="mx-auto mb-8">
          Share your thoughts and ideas. Explore trending tweets. Connect with
          the world.
        </h4>

        <ButtonTweet />

        <div className="flex flex-row gap-16 w-full max-w-8xl p-4">
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

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 border border-blue-300 rounded p-4">
              <h2>Hier ist Platz für `make a post`!!!</h2>
            </div>
            <div className="flex-1 border border-blue-300 rounded p-4">
              <h2>Hier ist Platz für Trends!!!</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
