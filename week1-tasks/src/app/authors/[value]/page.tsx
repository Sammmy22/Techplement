"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/custom/Navbar";

type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
};

const AuthorPage = () => {
  const { value } = useParams(); // Access the dynamic URL parameter
  const [authorData, setAuthorData] = useState<Quote[]>([]);

  useEffect(() => {
    if (value) {
      const decodedValue = decodeURIComponent(value as string);

      //   console.log(decodedValue);

      const fetchAuthorData = async () => {
        try {
          const response = await fetch(`/api/quotes/authors`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ author: decodedValue }),
          });
          const { quotes } = await response.json();
          console.log(quotes);
          setAuthorData(quotes);
        } catch (error) {
          console.error("Error fetching author data:", error);
        }
      };

      fetchAuthorData();
    }
  }, [value]);

  if (!authorData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      {authorData.map((quote) => (
        <div key={quote._id}>
          <p>{quote.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AuthorPage;
