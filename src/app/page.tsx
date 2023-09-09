'use client'
import Image from 'next/image'
import { useChat } from 'ai/react'
import ChatMessage from '@/components/ChatMessage'

const prompt = `You are a chatbot with access to Replit's AI podcast transcripts.
Respond to user queries in a friendly manner. For any given query you will have
access to the previous messages with the user as well as top 2 relevant transcripts
from any podcast episode. Respond to the queries in format following the
template given below:


Response format:

TEXT response
<delim>
{TIMESTAMP 1} {ID of corresponding transcript}
{TIMESTAMP 2} {ID of corresponding transcript}


Example response:

Deploying large-scale AI models can be a challenging task, requiring significant engineering efforts for building verifiers and conducting large-scale testing. Big companies like Google may have an advantage in approaching this, but collaboration with other organizations can also be beneficial.
<ts-delim>
1200.49 1_23
3700.63 2_45
`

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
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
    <main className="flex min-h-screen flex-col items-center justify-start py-24">
      <form 
        onSubmit={handleSubmit}
        className='w-full max-w-md mb-10'
      >
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          placeholder='what do you want to know?'
          className='px-4 w-full rounded h-10 text-neutral-600 shadow-xl shadow-white/20'
        />
      </form>
      <div className='w-full text-left'>
        {messages.map(m => (
          <ChatMessage key={m.id} role={m.role} message={m.content} />
        ))}
      </div>
    </main>
  )
}
