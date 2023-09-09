'use client'
import { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

import ChatMessage from '@/components/ChatMessage'
import Landing from '@/components/Landing'

const prompt = `You are a chatbot with access to Replit's AI podcast transcripts.
Respond to user queries in a friendly manner. For any given query you will have
access to the previous messages with the user as well as relevant transcripts
from any podcast episode. You should respond with a text message which will be
shown to the user (as a result do not put raw timestamps there). Following that
there should be a delimiter <ts-delim>, and after that add timestamps for 2 
transcripts. If the user query and the transcript does not have much relevance,
only return the text response without delimiter or timestamps.
The response template and example is given below.


Response template:

TEXT response without any timestamp
<ts-delim>
{TIMESTAMP 1} {ID of corresponding transcript}
{TIMESTAMP 2} {ID of corresponding transcript}


Typical response:

Deploying large-scale AI models can be a challenging task, requiring significant engineering efforts for building verifiers and conducting large-scale testing. Big companies like Google may have an advantage in approaching this, but collaboration with other organizations can also be beneficial.
<ts-delim>
1200.49 1_23
3700.63 2_45

Response if user query does not have good relation with transcript:

Deploying large-scale AI models can be a challenging task, requiring significant engineering efforts for building verifiers and conducting large-scale testing. Big companies like Google may have an advantage in approaching this, but collaboration with other organizations can also be beneficial.
`

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "/api/chat",
    initialMessages: [
      {
        id: 'init',
        role: 'system',
        content: prompt,
      }
    ]
  })

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [messages])

  return (
    <main className="flex h-screen flex-col items-center justify-start">
      <div ref={containerRef} className='overflow-auto w-full text-left flex-1'>
        {messages.length === 1 && (
          <Landing />
        )}

        {messages.map(m => (
          <ChatMessage key={m.id} role={m.role} message={m.content} />
        ))}
      </div>
      <div className='w-full bg-neutral-900'>
        <form 
          onSubmit={handleSubmit}
          className='w-full max-w-md my-10 mx-auto flex space-x-3 items-center'
        >
          <span className='text-xl'>⠕</span>
          <input
            type='text'
            value={input}
            onChange={handleInputChange}
            placeholder='what do you want to know?'
            className='px-4 w-full rounded h-10 text-neutral-600 shadow-xl shadow-white/20'
          />
          <button type='submit' className='px-3 hover:bg-neutral-700 rounded duration-200'>
            <ArrowRightIcon className='h-5 w-5 text-white' />
          </button>
        </form>
      </div>
    </main>
  )
}
