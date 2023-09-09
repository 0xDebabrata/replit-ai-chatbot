'use client'
import Image from 'next/image'
import { useChat } from 'ai/react'

const prompt = `You are a chatbot with access to Replit's AI podcast transcripts.
Respond to user queries in a friendly manner. For any given query you will have
access to the previous messages with the user as well as relevant transcripts
from any podcast episode. Respond to the queries in JSON format following the
template given below:

{
  "response": YOUR_RESPONSE,
  "timestamps": [
    {
      "timestamp": TIMESTAMP,
      "id": ID of corresponding transcript
    },
    ...maximum of 3 objects
  ]
}
`

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading: loading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: 'init',
        role: 'system',
        content: prompt,
      }
    ]
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form 
        onSubmit={handleSubmit}
        className='w-full max-w-md'
      >
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          placeholder='what do you want to know?'
          className='px-4 w-full rounded h-10 text-neutral-600 shadow-xl shadow-white/20'
        />
      </form>
      <div>
        {messages.map(m => (
          <div key={m.id}>
            {m.role}: {m.content}
          </div>
        ))}
      </div>
    </main>
  )
}
