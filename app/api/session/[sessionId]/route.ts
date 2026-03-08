import { getSupabaseAdmin } from '@/lib/supabase'

type Props = { params: Promise<{ sessionId: string }> }

export async function GET(_request: Request, props: Props) {
  const { sessionId } = await props.params
  const db = getSupabaseAdmin()

  const { data, error } = await db
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }

  return Response.json(data)
}

export async function PATCH(request: Request, props: Props) {
  const { sessionId } = await props.params
  const { answers, name }: { answers: string[]; name?: string } = await request.json()
  const db = getSupabaseAdmin()

  if (!answers || answers.length !== 10) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { data: session } = await db
    .from('sessions')
    .select('person2_done')
    .eq('id', sessionId)
    .single()

  if (!session) {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }

  if (session.person2_done) {
    return Response.json({ error: 'Already submitted' }, { status: 409 })
  }

  const person2_name = name?.trim().slice(0, 30) || null

  const { error } = await db
    .from('sessions')
    .update({ person2_answers: answers, person2_done: true, person2_name })
    .eq('id', sessionId)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true })
}
