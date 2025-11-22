'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function Onboarding() {
  const [dump, setDump] = useState('')

  const save = async () => {
    await supabase.from('profiles').upsert({ master_brain_dump: dump })
    window.location.href = '/dashboard'
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Tell Me Everything So I Can Run Your Life Better Than You Can.</h1>
      <textarea
        value={dump}
        onChange={(e) => setDump(e.target.value)}
        className="w-full h-96 bg-gray-900 rounded-xl p-6 text-lg"
        placeholder="Debts, goals, childhood dreams, what rewards work, what punishments scare you... everything."
      />
      <button onClick={save} className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-xl">
        Lock It In Forever → Dashboard
      </button>
    </div>
  )
}
