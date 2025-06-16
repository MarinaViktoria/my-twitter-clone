"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="h-14 w-14 md:h-16 md:w-16 cursor-pointer flex items-center justify-center"
    >
      <Image src="/logo.png" alt="Logo" width={64} height={64} />
    </div>
  );
}
