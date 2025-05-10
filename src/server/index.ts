import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/resources', async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const prompt = `Provide a comprehensive list of learning resources for ${topic} in HDL and Verilog. Include:
    1. Online tutorials and courses
    2. Books and documentation
    3. Video resources
    4. Practice problems and examples
    5. Tools and simulators
    Format the response in markdown with proper headings and links.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    const resources = completion.choices[0].message?.content || '';
    res.json({ resources });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate resources' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 