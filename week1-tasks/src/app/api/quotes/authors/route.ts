import QUOTES from "../quotes.json";

const AUTHORS: string[] = [];
for (const quote of QUOTES) {
  if (!AUTHORS.includes(quote.author)) {
    AUTHORS.push(quote.author);
  }
}

export async function GET(request: Request) {
  return new Response(JSON.stringify({ AUTHORS }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { author } = data;

  const quotes = [];
  if (AUTHORS.includes(author)) {
    for (const quote of QUOTES) {
      if (quote.author === author) {
        quotes.push(quote);
      }
    }

    return new Response(JSON.stringify({ quotes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
