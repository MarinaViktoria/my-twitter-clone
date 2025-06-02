export default function TweeterCard({ tweet }) {
  return (
    <div className="border border-blue-200 rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-center font-bold mb-4">{tweet.name}</h3>
      <p>{tweet.text}</p>
    </div>
  );
}
