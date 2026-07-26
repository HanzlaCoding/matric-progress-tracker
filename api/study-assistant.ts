import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

// Vercel Serverless Function Handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, subject, studentName } = req.body

    const google = createGoogleGenerativeAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    })

    const SUBJECT_GUIDES = {
      Physics: 'Explain concepts using formulas, real-world examples, and include step-by-step problem solving. Cover mechanics, heat, light, electricity, and modern physics.',
      Math: 'Guide through mathematical proofs, algebraic manipulations, and trigonometric identities. Emphasize conceptual understanding before calculation.',
      Chemistry: 'Explain chemical reactions, atomic structure, bonding, and stoichiometry. Use balanced equations and relate to practical applications.',
      Computer: 'Cover programming concepts, data structures, algorithms, and databases. Provide code examples when relevant to the Pakistani curriculum.',
      English: 'Help with grammar, vocabulary, essay writing, and comprehension. Provide context from Pakistani literature and examples.',
      Urdu: 'Explain Urdu grammar, literature, poetry, and writing skills. Use proper Urdu script and cultural context where applicable.',
    }

    const subjectGuide = SUBJECT_GUIDES[subject] || 'Provide comprehensive, educational responses.'

    const systemPrompt = `You are a highly knowledgeable and encouraging Pakistani matriculation ${subject} tutor. Your role is to help ${studentName} understand ${subject} concepts, solve problems, and prepare for their upcoming exams.

Subject Focus: ${subjectGuide}

Key Guidelines:
- Provide clear, step-by-step explanations
- Use examples relevant to the Pakistani curriculum (FBISE/Provincial boards)
- Keep responses concise but comprehensive (100-200 words ideal)
- For formulas, explain the derivation briefly
- Guide students to think through problems rather than just giving answers
- Be encouraging and supportive - celebrate their learning efforts
- Use simple language but maintain academic rigor
- If the question is off-topic, politely redirect to ${subject}
- End responses with a related concept they should study next or a practice tip

Remember: You're helping a Pakistani matriculation student prepare for their board exams in ${subject}.`

    const response = await generateText({
      model: google('gemini-3-flash-preview'),
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
      maxOutputTokens: 500,
    })

    return res.status(200).json({
      response: response.text,
      usage: {
        inputTokens: response.usage?.inputTokens || 0,
        outputTokens: response.usage?.outputTokens || 0,
      },
    })
  } catch (error) {
    console.error('[v0] Study Assistant Error:', error)

    return res.status(200).json({
      response: `I'm currently unable to connect to my knowledge base. However, I recommend:\n\n📚 Reviewing your textbook for "${req.body?.message || 'this topic'}"\n📝 Checking FBISE past papers\n💬 Asking your teacher for clarification\n\nTry again in a moment!`,
      usage: { inputTokens: 0, outputTokens: 0 },
    })
  }
}
