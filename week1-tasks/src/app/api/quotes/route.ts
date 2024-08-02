import QUOTES from "./quotes.json";

export async function GET(request: Request) {
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  const randomQuote = QUOTES[randomIndex];
  return new Response(JSON.stringify({ randomQuote }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  return new Response(JSON.stringify({ received: data }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
