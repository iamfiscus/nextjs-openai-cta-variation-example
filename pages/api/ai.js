require("dotenv").config();
import { OpenAIApi, Configuration } from "openai";
import { roles } from "../../utils/prompts";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  const { apiKey } = data;
  const prompts = roles(data);

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY || apiKey,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompts,
    });
    console.log(completion.data.choices[0].message);

    const result = JSON.parse(completion.data.choices[0].message.content);

    res.status(200).json(result);
  } catch (error) {
    res.status(422).json(error);
  }
}
