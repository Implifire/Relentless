import { grok } from '@/lib/grok' // we'll write this
import { supabase } from '@/lib/supabase'

async function getTodayPlan(userId: string) {
  // Check if plan exists for today
  let { data } = await supabase.from('daily_plans').select('plan_json').eq('user_id', userId).eq('date', new Date().toISOString().split('T')[0]).single()

  if (!data) {
    const { data: profile } = await supabase.from('profiles').select('master_brain_dump').eq('id', userId).single()
    
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'grok-4',
        messages: [
          { role: 'system', content: `THE EXACT SYSTEM PROMPT FROM BEFORE...` }, // paste the full morning prompt here
          { role: 'user', content: `${profile.master_brain_dump}\n\nGenerate today's plan now.` }
        ],
        temperature: 0.7
      })
    })

    const plan = await response.json()
    const planJson = JSON.parse(plan.choices[0].message.content) // assuming JSON output

    await supabase.from('daily_plans').insert({ user_id: userId, plan_json: planJson })

    return planJson
  }
  return data.plan_json
}

export default async function Dashboard() {
  const { user } = await getUser() // your auth check
  const plan = await getTodayPlan(user.id)

  return (
    <div className="p-8">
      <h1 className="text-6xl font-black">TODAY'S PERFECT DAY</h1>
      {plan.map((task: any) => (
        <div key={task.start_time} className="bg-gray-900 rounded-xl p-6 mb-4">
          <div className="flex justify-between">
            <span>{task.start_time} – {task.title}</span>
            <button className="bg-red-600 px-6 py-2 rounded">DONE</button>
          </div>
          <p className="text-gray-400">{task.why_this_matters}</p>
        </div>
      ))}
    </div>
  )
}
