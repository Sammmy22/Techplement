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
  // const quotes = await getQuotes();

  if (QUOTES) {
    AUTHORS = QUOTES.reduce((authors: string[], quote: Quote) => {
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
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { author } = data;

  // const quotes = await getQuotes();

  if (QUOTES && AUTHORS.includes(author)) {
    const filteredQuotes = QUOTES.filter(
      (quote: Quote) => quote.author === author
    );
    return new Response(JSON.stringify({ quotes: filteredQuotes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Author not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
