"use client";

//import { useRouter } from "next/navigation";
import ButtonLike from "./ButtonLike";

export default function TweeterCard({ tweet }) {
  //const router = useRouter();

  //const handleCardClick = () => {
  //router.push(`/tweet/${tweet._id}`);};

  return (
    <div className="cursor-pointer border border-blue-200 rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-center font-bold mb-4">{tweet.name}</h3>
      <p>{tweet.text}</p>

      <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
        <ButtonLike tweetId={tweet._id} />
      </div>
    </div>
  );
}
