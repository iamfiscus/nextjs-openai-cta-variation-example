require('dotenv').config()
import { OpenAIApi, Configuration } from 'openai'
import { roles, openai_function } from '../../utils/prompts'

async function generateImagePrompt(data) {
    const generate = await openai.createImage({
        prompt: args.image_prompt,
        n: 1,
        size: '1024x1024',
      })
}

export default async function handler(req, res) {
  const data = JSON.parse(req.body)
  const { apiKey } = data
  const prompts = roles(data)
  const functions = openai_function(data)

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY || apiKey,
    })
    const openai = new OpenAIApi(configuration)

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-  ',
      messages: prompts,
      functions,
      function_call: 'auto',
    })
    console.log('MESSAGE', completion.data.choices[0].message)

    const response = completion.data.choices[0].message

    if(!response.content && response.function_call.name === 'generateImagePrompt') {
        // Function was reutrned and needs to be called
        const { name } = response.function_call;
        const args = JSON.parse(response.function_call.arguments);

        // const generate = await openai.createImage({
        //     prompt: args.image_prompt,
        //     n: 1,
        //     size: '1024x1024',
        //   })

        // OR... call fuction
        // const generate = generateImagePrompt(args)

        // Let's be fancy and make it dynamic
        const generate = await window[name](args)

    }

    // TODO mixin images to vairations
    const { variations } = result
    const json = { images, variations }
    res.status(200).json(json)
  } catch (error) {
    res.status(422).json(error)
  }
}


