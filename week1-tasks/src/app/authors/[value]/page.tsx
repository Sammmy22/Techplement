"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/custom/Navbar";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
};

const AuthorPage = () => {
  const { value } = useParams();
  const [authorQuotes, setAuthorQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (value) {
      const decodedValue = decodeURIComponent(value as string);

      const fetchAuthorQuotes = async () => {
        try {
          const response = await fetch(`/api/quotes/authors`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ author: decodedValue }),
          });
          const { quotes } = await response.json();
          setAuthorQuotes(quotes);
        } catch (error) {
          console.error("Error fetching author data:", error);
        }
      };

      fetchAuthorQuotes();
    }
  }, [value]);

  if (!authorQuotes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <p className="whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white my-4">
        Quotes by <br className="md:hidden" />
        &quot;
        {decodeURIComponent(value as string)}&quot;
      </p>

      <div className="flex flex-col justify-center items-center">
        {authorQuotes.map((quote) => (
          <Card className="w-3/4 my-3" key={quote._id}>
            <CardHeader>
              <CardTitle>{quote.content}</CardTitle>
            </CardHeader>
            <CardFooter>
              <p>Tags: {quote.tags.join(", ")}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AuthorPage;
