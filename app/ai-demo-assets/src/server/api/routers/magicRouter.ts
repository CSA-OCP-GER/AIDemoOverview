import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { fetchHTML } from "~/server/lib/fetchHTML";
import { removeHTMLTagsAndSummarize, generateMagicData } from "~/server/lib/openAIUtils";
import { getDistinctAudiences, getDistinctIndustries, getDistinctKPIs, getDistinctTechnologies } from "~/server/lib/data";
import { api } from "~/trpc/server";

export const magicRouter = createTRPCRouter({
  getMagic: protectedProcedure
    .input(z.object({ link: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const text = await fetchHTML(input.link);
      if (!text) return { magic: "Magic" };

      const cleanText = await removeHTMLTagsAndSummarize(text);
      const prompt = await getPrompt();
      const magicJson = await generateMagicData(cleanText, prompt);

      return { magic: magicJson };
    }),

  getTextMagic: protectedProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const prompt = await getPrompt();
      const magicJson = await generateMagicData(input.text, prompt);

      return { magic: magicJson };
    }),
});

// generate prompt for openai
const getPrompt = async () => {
  const industries = await getDistinctIndustries();
  const industriesString = industries.join(", ");

  const technologies = await getDistinctTechnologies();
  const technologiesString = technologies.join(", ");

  const audiences = await getDistinctAudiences();
  const audiencesString = audiences.join(", ");

  const kpis = await getDistinctKPIs();
  const kpisString = kpis.join(", ");


  const images : string[] = await api.image.getImages.query();
  const imagesString = images.join(", ");


  const prompt = `
  You are analysing a text and you want to create a new AI Demo Asset which are primarily based on Microsoft technologies.
  The Demo Assets should people help to find the right demo assest for their presentation.
  Thus you want to generate a summary of the text and make suggestions for the following fields: Title, Description, Technologies, Industries, Reference, KPIs, Audience, Image
  
  If there are now information for a field, please return an empty string.

  Potential Industries: ${industriesString}
  Potential Technologies: ${technologiesString}
  Potential Audiences: ${audiencesString}
  Potential KPIs: ${kpisString}
  Potential Images: ${imagesString}

  Try to reuse existing values, but if there is no match, you can also return a new value. Limit the number of values to 3 per field and choose the most relevant values.

  Return the response exactly in this json format: 
  {
    "title": "",
    "description": "",
    "technologies": [],
    "industries": [],
    "reference": "",
    "kpis": [],
    "audience": [],
    "image": ""
  }

  Do not return additional text, only the json object.

  Here is the json:
  `;
  return prompt;
}
