import fetch from "node-fetch";
import { load } from "cheerio";

export const fetchHTML = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch URL: ${url}`);
    const body = await response.text();
    const $ = load(body);
    return $("html *")
      .contents()
      .map(function () {
       // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        return this.type === "text" ? $(this).text().trim() + " " : "";
      })
      .get()
      .join("");
  } catch (error) {
    console.error(`Error fetching HTML from ${url}:`, error);
    return null;
  }
};
