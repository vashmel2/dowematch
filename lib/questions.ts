export type Mode = 'couples' | 'friends' | 'situationship'

export interface Question {
  id: number
  text: string
  options: string[]
}

export const questions: Record<Mode, Question[]> = {
  couples: [
    { id: 1, text: 'After a big fight, I need to...', options: ['Space alone', 'Talk it out immediately', 'Distract myself', 'It depends'] },
    { id: 2, text: 'My ideal Sunday is...', options: ['Staying home', 'Going out', 'Mix of both', 'Spontaneous'] },
    { id: 3, text: "When I'm stressed I...", options: ['Go quiet', 'Talk about it', 'Get busy', 'Shut everyone out'] },
    { id: 4, text: 'Money should be...', options: ['Saved aggressively', 'Spent on experiences', 'Balanced', "We don't need to discuss it"] },
    { id: 5, text: 'I show love by...', options: ['Words', 'Quality time', 'Touch', 'Acts of service', 'Gifts'] },
    { id: 6, text: 'My communication style is...', options: ['Blunt and direct', 'Gentle and careful', 'Depends on mood', 'Mostly quiet'] },
    { id: 7, text: 'In a relationship, I need...', options: ['Lots of alone time', 'Constant togetherness', 'Balanced space', 'Still figuring it out'] },
    { id: 8, text: 'My biggest relationship fear is...', options: ['Abandonment', 'Loss of freedom', 'Growing apart', 'Dishonesty'] },
    { id: 9, text: 'Conflict resolution for me looks like...', options: ['Talking immediately', 'Cooling off first', 'Avoiding it', 'Writing it out'] },
    { id: 10, text: 'Long term I want...', options: ['Marriage', 'Companionship without labels', 'Still figuring it out', 'Kids and family'] },
  ],
  friends: [
    { id: 1, text: 'If you needed help at 2am, would I show up?', options: ['Yes without question', 'Probably', 'Depends what for', 'Unlikely'] },
    { id: 2, text: 'I think our friendship is...', options: ['Ride or die', 'Solid but chill', 'Still growing', 'Complicated'] },
    { id: 3, text: "When you're upset I usually...", options: ['Check on you', 'Wait for you to come to me', 'Try to make you laugh', 'Give you space'] },
    { id: 4, text: "I'd describe my loyalty as...", options: ['Unconditional', 'Strong but has limits', 'Situational', 'Still proving it'] },
    { id: 5, text: 'Our energy together is...', options: ['Chaotic fun', 'Chill and lowkey', 'Deep and serious', 'Unpredictable'] },
    { id: 6, text: "If you did something that hurt me I'd...", options: ['Tell you directly', 'Drop hints', 'Say nothing', 'Distance myself'] },
    { id: 7, text: 'I think you know me...', options: ['Better than most', 'Pretty well', 'On the surface', 'Not really yet'] },
    { id: 8, text: 'When we hang out I feel...', options: ['Energized', 'Comfortable', 'Entertained', 'Sometimes drained'] },
    { id: 9, text: "I think we're friends because...", options: ['Genuine connection', 'Circumstance', 'Shared history', 'Honestly not sure'] },
    { id: 10, text: 'This friendship in 5 years will be...', options: ['Stronger', 'About the same', 'Depends on life', 'Uncertain'] },
  ],
  situationship: [
    { id: 1, text: 'What we have is...', options: ['More than friends', 'Complicated', 'Fun for now', 'Honestly unclear'] },
    { id: 2, text: 'I think about you...', options: ['A lot', 'Sometimes', 'Only when we talk', 'More than I admit'] },
    { id: 3, text: "The reason we haven't defined this is...", options: ['Not ready', 'Scared of the answer', 'Enjoying the flow', 'One of us is holding back'] },
    { id: 4, text: 'If you started dating someone else I\'d feel...', options: ['Hurt', 'Relieved', 'Confused', 'Nothing'] },
    { id: 5, text: 'What I actually want is...', options: ['Something real', 'Keep it casual', "I don't know", 'Whatever you want'] },
    { id: 6, text: 'I think you like me...', options: ['More than you show', 'Less than I want', 'About the same as I like you', "It's complicated"] },
    { id: 7, text: 'Our situation is...', options: ['Heading somewhere', 'Stuck', 'Fading', 'Neither of us knows'] },
    { id: 8, text: 'The talking stage for us has been...', options: ['Too long', 'Just right', 'Barely started', 'On and off'] },
    { id: 9, text: 'If I had to be honest, I think we...', options: ['Should just date', 'Are better as friends', 'Need to talk', 'Should keep it as is'] },
    { id: 10, text: 'Reading this result together feels...', options: ['Exciting', 'Terrifying', 'Necessary', 'Like a mistake'] },
  ],
}

export const modeLabels: Record<Mode, string> = {
  couples: 'Couples',
  friends: 'Friends',
  situationship: 'Situationship',
}

export const modeEmojis: Record<Mode, string> = {
  couples: '\u{1F491}',
  friends: '\u{1F46F}',
  situationship: '\u{1F62C}',
}
