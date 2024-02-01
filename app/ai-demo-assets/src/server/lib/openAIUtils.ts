import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const removeHTMLTagsAndSummarize = async (
  text: string,
): Promise<string> => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Remove HTML tags from text and return only the main content.",
        },
        { role: "user", content: text },
      ],
      model: process.env.OPENAI_MODEL_HTML_STRIP ?? "gpt-3.5-turbo-16k",
    });
    return chatCompletion.choices[0]?.message.content ?? "";
  } catch (error) {
    console.error("Error in OpenAI completion:", error);
    return "";
  }
};

export const generateMagicData = async (
  text: string,
  prompt: string,
): Promise<string> => {
  try {
    const chatMagic = await openai.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text },
      ],
      model: process.env.OPENAI_MODEL_MAGIC ?? "gpt-4-turbo-preview",
    });
    const magic = chatMagic.choices[0]?.message.content ?? "";
    return magic.substring(magic.indexOf("{"), magic.lastIndexOf("}") + 1);
  } catch (error) {
    console.error("Error generating magic data with OpenAI:", error);
    return "{}";
  }
};
