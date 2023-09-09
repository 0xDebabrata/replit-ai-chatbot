import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse, Message } from "ai";
import { vectorSearch } from "@/citrus/search";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

const indexName = 'replit'

async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  })
  return response.data[0].embedding
}

export async function POST(req: Request) {
  const { messages } = await req.json()
  const latestMessage = messages[messages.length - 1] as Message
  const vectorEmbedding = await generateEmbedding(latestMessage.content)
  const semanticSearchResult = await vectorSearch(indexName, vectorEmbedding, 5)
  const context = semanticSearchResult.map((res: any) => ({
    id: res.id,
    transcript: res.document
  }))

  const contextInjectedMessage = `${latestMessage.content}

  Transcripts:
  ${JSON.stringify(context)}

  Remember to answer in the format as provided in the system message
  `
  messages[messages.length - 1].content = contextInjectedMessage
  console.log(messages)

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
    max_tokens: 600,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
