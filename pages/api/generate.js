import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const basePromptPrefix =
  `
  Write me a cheerful and joyful christmas message for ${req.body.name} who identifies as ${req.body.gender} and is my ${req.body.relation}. 
  This will go inside a Christmas card and should be roughly 4 paragraphs long that also mentions ${req.body.experience1}, and ${req.body.experience2}. 
  `
  // Run first prompt
  console.log(`API: ${basePromptPrefix}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}\n`,
    temperature: 0.9,
    max_tokens: 350,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;