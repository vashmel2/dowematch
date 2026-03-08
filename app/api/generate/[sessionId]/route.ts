import { getSupabaseAdmin } from '@/lib/supabase'
import { generateCompatibilityResult } from '@/lib/groq'
import { type Mode } from '@/lib/questions'

type Props = { params: Promise<{ sessionId: string }> }

export async function POST(_request: Request, props: Props) {
  const { sessionId } = await props.params
  const db = getSupabaseAdmin()

  // Atomic lock: only proceed if result_generated is false
  const { data: locked } = await db
    .from('sessions')
    .update({ result_generated: true })
    .eq('id', sessionId)
    .eq('result_generated', false)
    .select('id, mode, person1_answers, person2_answers, person2_done, person1_name, person2_name')

  if (!locked || locked.length === 0) {
    return Response.json({ message: 'already generating' })
  }

  const session = locked[0]

  if (!session.person2_done || !session.person1_answers || !session.person2_answers) {
    await db.from('sessions').update({ result_generated: false }).eq('id', sessionId)
    return Response.json({ error: 'Not ready' }, { status: 400 })
  }

  try {
    const result = await generateCompatibilityResult(
      session.mode as Mode,
      session.person1_answers,
      session.person2_answers,
      session.person1_name,
      session.person2_name
    )

    await db.from('sessions').update({ ai_result: result }).eq('id', sessionId)

    return Response.json({ success: true, result })
  } catch (err) {
    await db.from('sessions').update({ result_generated: false }).eq('id', sessionId)
    console.error('Groq generation error:', err)
    return Response.json({ error: 'Generation failed' }, { status: 500 })
  }
}
