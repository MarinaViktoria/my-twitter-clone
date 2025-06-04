"use client";

import { useEffect, useState } from "react";

export default function TypingWelcome() {
  const text = "Welcome to T-weeter";
  const [showText, setShowText] = useState("");
  const speed = 70;

  useEffect(() => {
    let i = 0;
    let timeoutId;

    function type() {
      if (i < text.length) {
        setShowText(text.substring(0, i + 1));
        i++;
        timeoutId = setTimeout(type, speed);
      }
    }

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <h1 className="mx-auto text-center text-2xl font-bold mb-4 mt-8">
        {showText}
      </h1>
    </div>
  );
}
