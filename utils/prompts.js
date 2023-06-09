export function roles(data) {
  console.log('Prompt!', data)
  return [
    {
      role: 'system',
      content: 'Act as a marketing manager',
    },
    {
      role: 'system',
      content: `You need to create some ad copy for an article. write the ad copy so that it fits with the brand voice of how the article is written. 
        The copy must be SEO ready.
        The ad needs to have a headline that is ${data.headline} characters or less,
        a body of text that is ${data.body} characters or less, and a call-to-action button text that has ${data.cta} characters or less.
        Include an image prompt string for generating variations of photographs for people of various ages ${data.product} without any text.
        `,
    },
    {
      role: 'user',
      content: `Create an ad with the goal of getting as many people as possible to click on the ad and purchasing the product. 
        The ad is selling the ${data.product}. The article that this will be place on is ${data.summary}. 
        The ad copy should closely relate to the content in the article to increase the click through rate.
        Generate ${data.versions} more versions of that ad copy. 
        Each version should be different from the others.
        They should be different in the headline, body, and call-to-action button text.`,
    },
    {
      role: 'system',
      content: `
            The expected result is to JSON object quotes escaped, in an array length of ${data.versions}. Result that looks like this:
            {
              image_prompt: "people ${data.product}. photography style. no text only images",
              variations:
              [{
                headline: "The \"headline\" of the ad" (string),
                body: "The body of the ad" (string),
                cta: "The call-to-action button text" (string)
              },
              {
                headline: "The headline of the ad" (string),
                body: "The body of the ad" (string),
                cta: "The call-to-action button text" (string)
              }]
            }
          `,
    },
  ]
}
