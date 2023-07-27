require('dotenv').config()
import { OpenAIApi, Configuration } from 'openai'
import { openai_system } from '../../utils/prompts'

export default async function handler(req, res) {
  const data = JSON.parse(req.body)
  const { apiKey } = data
  const prompts = openai_system(data)

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY || apiKey,
    })
    const openai = new OpenAIApi(configuration)

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: prompts,
      function_calls: "auto"
    })
    console.log('MESSAGE', completion.data.choices[0].message)

    const result = JSON.parse(completion.data.choices[0].message.content)

    const functionCallName = result.function_call.name;

    if (functionCallName === 'generateImagePrompt') {

      const generate = await openai.createImage({
        prompt: result.image_prompt,
        n: result.variations.length,
        size: '1024x1024',
      })
    } else if (functionCallName === 'lookupTime') {
      // Call API to get the time
      const time = await fetch(`http://worldtimeapi.org/api/timezone/${result.location}`)
      const timeJson = await time.json()
      result.time = timeJson.datetime

    } else if (functionCallName === 'lookupSports') {
      // Call API to get the sports
      
    } else {
      // Call the function name dynamically
      window[functionCallName](result)
    }
    // TODO mix in images to vairations
    console.log(generate.data.data)
    const images = generate.data.data

    const { variations } = result
    const json = { images, variations }
    res.status(200).json(json)
  } catch (error) {
    res.status(422).json(error)
  }
}
