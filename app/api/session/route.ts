import { getSupabaseAdmin } from '@/lib/supabase'
import { generateSessionId } from '@/lib/utils'
import { type Mode } from '@/lib/questions'

export async function POST(request: Request) {
  const { mode, answers, name }: { mode: Mode; answers: string[]; name?: string } = await request.json()

  if (!mode || !answers || answers.length !== 10) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const sessionId = generateSessionId()
  const person1_name = name?.trim().slice(0, 30) || null

  const { error } = await getSupabaseAdmin().from('sessions').insert({
    id: sessionId,
    mode,
    person1_answers: answers,
    person1_done: true,
    person1_name,
  })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ sessionId })
}
