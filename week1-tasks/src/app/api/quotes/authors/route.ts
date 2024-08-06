import { getQuotes } from "@/lib/firebase";

let AUTHORS: string[] = [];
import QUOTES from "../quotes.json";
type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
};

const initializeAuthors = async () => {
  const quotes = await getQuotes();

  if (quotes) {
    AUTHORS = quotes.reduce((authors: string[], quote: Quote) => {
      if (!authors.includes(quote.author)) {
        authors.push(quote.author);
      }
      authors.sort((a, b) => a.localeCompare(b));
      return authors;
    }, []);
  }
};

initializeAuthors();

export async function GET(request: Request) {
  await initializeAuthors();
  return new Response(JSON.stringify({ AUTHORS }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { author } = data;

  const quotes = await getQuotes();

  if (quotes && AUTHORS.includes(author)) {
    const filteredQuotes = quotes.filter(
      (quote: Quote) => quote.author === author
    );
    return new Response(JSON.stringify({ quotes: filteredQuotes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Author not found" }), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
