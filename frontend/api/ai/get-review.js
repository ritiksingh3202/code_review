import groq from 'groq-sdk';

const systemInstruction = `
You are an expert code reviewer with 7+ years of development experience.
Focus on: code quality, best practices, efficiency, error detection, scalability, readability.
Provide concise, constructive feedback with code examples when needed.
`;

const groqClient = new groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const completion = await groqClient.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: `Review this code:\n\n${code}` }
      ],
      temperature: 0.4,
    });

    const review = completion.choices[0].message.content;
    res.status(200).json({ review });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'AI service failed. Please try again later.' });
  }
}
