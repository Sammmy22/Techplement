"use client";

import Navbar from "@/components/custom/Navbar";
import { useEffect, useState } from "react";

type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
};

export default function Home() {
  const [randomQuote, setRandomQuote] = useState<Quote>();
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

      {randomQuote ? (
        <div className="flex justify-center text-center">
          <p className="text-3xl font-bold">{randomQuote.content}</p>
        </div>
      ) : null}
    </>
  );
}
