export async function GET(request: Request) {
  return new Response('Hello, GET - Method!')
}
export async function POST(request: Request) {
  return new Response('Hello, POST - Method')
}
