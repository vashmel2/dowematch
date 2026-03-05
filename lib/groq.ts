import { questions, type Mode } from './questions'
import type { AIResult } from './supabase'

export async function generateCompatibilityResult(
  mode: Mode,
  person1Answers: string[],
  person2Answers: string[]
): Promise<AIResult> {
  const qs = questions[mode]

  const formatAnswers = (answers: string[]) =>
    qs.map((q, i) => `${i + 1}. ${q.text} → ${answers[i]}`).join('\n')

  const modeDescriptions = {
    dating: 'dating relationship (boyfriend/girlfriend). They are still building the relationship and figuring out if they are headed the same direction. Focus on communication mismatches, compatibility of life goals, and early red flags or green flags.',
    married: 'long-term relationship or marriage. They are already committed and living life together. Do NOT question whether they should be together — focus on day-to-day dynamics, how they function as a unit, where friction builds up quietly, and what they do well together that they may take for granted.',
    friends: 'friendship',
    situationship: 'situationship / undefined relationship',
  }

  const pairLabels: Record<Mode, [string, string]> = {
    dating: ['Partner A', 'Partner B'],
    married: ['Partner A', 'Partner B'],
    friends: ['Friend A', 'Friend B'],
    situationship: ['Person A', 'Person B'],
  }
  const [label1, label2] = pairLabels[mode]

  const prompt = `You are analyzing a ${modeDescriptions[mode]} compatibility reveal.
Two people answered the same 10 questions separately and honestly.

${label1}'s answers:
${formatAnswers(person1Answers)}

${label2}'s answers:
${formatAnswers(person2Answers)}

Write a compatibility report with these sections:

1. SCORE: Give a compatibility percentage (0-100). Be realistic — not everyone is 85%+.
2. LABEL: Give them a 2-4 word category name (e.g. "The Complicated Ones", "Slow Burn Warning", "Built Different", "Barely Surviving", "The Real Ones")
3. REPORT: Write 4-6 paragraphs. Be specific, reference their actual answers, be insightful and direct. Do NOT be generic. Do NOT sound like a horoscope. Sound like a candid friend who sees both sides. Point out real tensions and real strengths.
4. STRENGTH: One sentence on their biggest strength as a pair.
5. WATCH OUT: One sentence on their biggest friction point or concern.

IMPORTANT CONTENT RULES — follow these strictly:
- Keep language appropriate for all ages. No profanity, explicit language, or crude humor.
- Do not reference, imply, or joke about self-harm, suicide, or harm of any kind.
- Do not reference substance abuse, alcohol, or drug use.
- Do not produce sexually explicit or suggestive content.
- Stay focused on relationship dynamics only. Do not stray into unrelated personal judgments.

Format your response as JSON:
{
  "score": 74,
  "label": "The Complicated Ones",
  "report": "...",
  "strength": "...",
  "watchout": "..."
}`

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`)
  }

  const data = await response.json()
  return JSON.parse(data.choices[0].message.content)
}
