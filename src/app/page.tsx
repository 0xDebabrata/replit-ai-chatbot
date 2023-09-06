'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='w-full max-w-md'>
        <input
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='what do you want to know?'
          className='px-5 w-full rounded h-10 text-neutral-600 shadow-xl shadow-white/20'
        />
      </div>
    </main>
  )
}
