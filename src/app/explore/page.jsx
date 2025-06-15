import ButtonLogout from "components/ButtonLogout";
import TweeterCard from "../../../components/TweeterCard";
import Link from "next/link";

export default async function Explore() {
  const res = await fetch("http://localhost:3000/api/tweets", {
    cache: "no-store",
  });
  const data = await res.json();
  const tweets = data.tweets || [];

  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20">
      <main className="flex flex-col items-center sm:items-start">
        <ul>
          {tweets.map((tweet) => (
            <li key={tweet._id}>
              <Link href={`tweet/${tweet._id}`}>
                <TweeterCard tweet={tweet} />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <ButtonLogout />
    </div>
  );
}
