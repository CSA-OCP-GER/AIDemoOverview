// routers/aidemoasset.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAIDemoAssets } from "~/server/lib/data";

export const aiDemoAssetRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ text: z.string().optional() })) // Make text optional
    .query(async ({ input }) => {
      const assets = await getAIDemoAssets();
      if (!input.text) {
        return assets; // Return all assets if no search text is provided
      }
      // Perform search if search text is provided
      const search = input.text.toLowerCase();
      const results = assets.filter((asset) => {
        const name = asset.name.toLowerCase();
        const description = asset.description.toLowerCase();
        // Assuming 'area' is a property you want to search, if it exists
        // const area = asset.area?.toLowerCase() || '';
        const industries = asset.industries.map((industry) => industry.toLowerCase());

        // Add any other properties you want to include in the search
        return (
          name.includes(search) ||
          description.includes(search) ||
        //   area.includes(search) ||
          industries.some((industry) => industry.includes(search))
        );
      });

      return results;
    }),
});