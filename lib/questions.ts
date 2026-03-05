export type Mode = 'dating' | 'married' | 'friends' | 'situationship'

export interface Question {
  id: number
  text: string
  options: string[]
}

export const questions: Record<Mode, Question[]> = {
  dating: [
    { id: 1, text: 'After a big fight, I need to...', options: ['Have some space', 'Talk it out immediately', 'Distract myself', 'It depends'] },
    { id: 2, text: 'My ideal Sunday is...', options: ['Staying home', 'Going out', 'Mix of both', 'Whatever comes up'] },
    { id: 3, text: "When I'm stressed I...", options: ['Go quiet', 'Talk about it', 'Get busy', 'Shut everyone out'] },
    { id: 4, text: 'Money should be...', options: ['Saved aggressively', 'Spent on experiences', 'Balanced', "Honestly not my focus right now"] },
    { id: 5, text: 'I show love by...', options: ['Saying it out loud', 'Quality time', 'Touch', 'Acts of service', 'Gifts'] },
    { id: 6, text: 'My communication style is...', options: ['Blunt and direct', 'Gentle and careful', 'Depends on mood', 'Mostly quiet'] },
    { id: 7, text: 'In a relationship, I need...', options: ['Lots of alone time', 'Constant togetherness', 'Balanced space', 'Still figuring it out'] },
    { id: 8, text: 'My biggest relationship fear is...', options: ['Abandonment', 'Loss of freedom', 'Growing apart', 'Dishonesty'] },
    { id: 9, text: 'Conflict resolution for me looks like...', options: ['Talking immediately', 'Cooling off first', 'Avoiding it', 'Writing it out'] },
    { id: 10, text: 'Where I see us in 2 years...', options: ['Moved in together', 'Engaged or married', 'Still dating', 'Honestly not sure yet'] },
  ],
  married: [
    { id: 1, text: 'After a big fight, I need to...', options: ['Have some space', 'Talk it out right away', 'Distract myself', 'It depends'] },
    { id: 2, text: 'I show love by...', options: ['Saying it out loud', 'Quality time', 'Touch', 'Acts of service'] },
    { id: 3, text: 'My biggest fear for us right now is...', options: ['Growing apart', 'Losing ourselves in routine', 'Financial pressure', 'Honestly, we\'re fine'] },
    { id: 4, text: 'The home workload — my honest take is...', options: ['I carry more than my share', 'They carry more', 'It feels fair', 'We\'ve never really talked about it'] },
    { id: 5, text: 'With money, I tend to...', options: ['Save aggressively', 'Spend on what makes us happy', 'Try to balance', 'Avoid thinking about it'] },
    { id: 6, text: 'When we disagree on something big, I...', options: ['Push to talk it through', 'Give in to keep the peace', 'Wait until we\'ve both cooled down', 'Dig in until I\'m heard'] },
    { id: 7, text: 'Quality time — I feel like we get...', options: ['Enough, we\'re intentional about it', 'Some, but could use more', 'Not enough lately', 'It\'s become routine'] },
    { id: 8, text: 'I feel most connected when...', options: ['We have a real conversation', 'We do things together', 'There\'s physical closeness', 'They just show up for me'] },
    { id: 9, text: 'When it comes to our future plans, I think...', options: ['We\'re fully aligned', 'Mostly on the same page', 'There are gaps we haven\'t addressed', 'We avoid the topic'] },
    { id: 10, text: 'In 10 years, I picture us...', options: ['Living somewhere new', 'Settled and thriving', 'Still figuring it out', 'Stronger than we are now'] },
  ],
  friends: [
    { id: 1, text: 'If you needed help at 2am, would I show up?', options: ['Yes without question', 'Probably', 'Depends what for', 'Unlikely'] },
    { id: 2, text: 'I think our friendship is...', options: ['Unbreakable', 'Solid but chill', 'Still growing', 'Complicated'] },
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
    { id: 5, text: 'What I actually want is...', options: ['Something real', 'Keeping it casual', "I don't know", 'Whatever you want'] },
    { id: 6, text: 'I think you like me...', options: ['More than you show', 'Less than I want', 'About the same as I like you', "It's complicated"] },
    { id: 7, text: 'Our situation is...', options: ['Heading somewhere', 'Stuck', 'Fading', 'Neither of us knows'] },
    { id: 8, text: 'The talking stage for us has been...', options: ['Too long', 'Just right', 'Barely started', 'On and off'] },
    { id: 9, text: 'If I had to be honest, I think we...', options: ['Should just date', 'Are better as friends', 'Need to talk', 'Should keep it as is'] },
    { id: 10, text: 'Reading this result together feels...', options: ['Exciting', 'Terrifying', 'Necessary', 'Like a mistake'] },
  ],
}

export const modeLabels: Record<Mode, string> = {
  dating: 'Dating',
  married: 'Married / Long-term',
  friends: 'Friends',
  situationship: 'Situationship',
}

export const modeEmojis: Record<Mode, string> = {
  dating: '\u{1F48F}',
  married: '\u{1F48D}',
  friends: '\u{1F46F}',
  situationship: '\u{1F62C}',
}
