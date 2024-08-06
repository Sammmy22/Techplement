import { getQuotes } from "@/lib/firebase";
import QUOTES from "./quotes.json";
export async function GET(request: Request) {
  const quotes = await getQuotes();

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return new Response(JSON.stringify({ randomQuote }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
