"use client";

import Navbar from "@/components/custom/Navbar";
import DotPattern from "@/components/magicui/dot-pattern";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
};

export default function Home() {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/quotes", { method: "GET" });
      const { randomQuote } = await response.json();
      setRandomQuote(randomQuote);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <div className="relative z-10 flex flex-col w-full max-w-6xl px-6 md:px-12 items-center">
          <p className="whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white mb-4">
            {randomQuote?.content}
          </p>
          <p className="whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter text-black dark:text-white">
            - {randomQuote?.author}
          </p>
        </div>
        <DotPattern
          className={cn(
            "absolute inset-0 max-md:[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    </>
  );
}
