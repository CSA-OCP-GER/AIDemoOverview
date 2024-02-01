// routers/aidemoasset.ts
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  getAIDemoAssets,
  getDistinctIndustries,
  createAIDemoAsset,
  updateAIDemoAsset,
} from "~/server/lib/data";

// Define the input schema for creating a new AIDemoAsset, omitting the 'id' field
const createAIDemoAssetSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().nullable(),
  technologies: z.array(z.string()),
  industries: z.array(z.string()),
  reference: z.string().nullable(),
  kpis: z.array(z.string()),
  audience: z.array(z.string()),
  material: z.string().nullable(),
  link: z.string().url(),
  type: z.string(),
});

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
        const industries = asset.industries.map((industry) =>
          industry.toLowerCase(),
        );

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

    getById: publicProcedure
    .input(z.string() )
    .query(async ({ input }) => {
      const assets = await getAIDemoAssets();
      const asset = assets.find((asset) => asset.id === input);
      return asset;
    }),

  // Get all distinct industries
  getDistinctIndustries: publicProcedure.query(async () => {
    const industries = await getDistinctIndustries();
    // Sort the industries alphabetically
    return industries.sort();
  }),

  // Get all distinct technologies
  getDistinctTechnologies: publicProcedure.query(async () => {
    const assets = await getAIDemoAssets();
    const technologies = assets.reduce<string[]>((acc, asset) => {
      return [...acc, ...asset.technologies];
    }, []);
    // Sort the technologies alphabetically
    return [...new Set(technologies)].sort();
  }),

  // Get all distinct KPIs
  getDistinctKPIs: publicProcedure.query(async () => {
    const assets = await getAIDemoAssets();
    const kpis = assets.reduce<string[]>((acc, asset) => {
      return [...acc, ...asset.kpis];
    }, []);
    // Sort the KPIs alphabetically
    return [...new Set(kpis)].sort();
  }),

  // Get all distinct audiences
  getDistinctAudiences: publicProcedure.query(async () => {
    const assets = await getAIDemoAssets();
    const audiences = assets.reduce<string[]>((acc, asset) => {
      return [...acc, ...asset.audience];
    }, []);
    // Sort the audiences alphabetically
    return [...new Set(audiences)].sort();
  }),

  create: protectedProcedure
    .input(createAIDemoAssetSchema)
    .mutation(async ({ input }) => {
      const newAsset = await createAIDemoAsset({
        ...input,
        id: generateUniqueId(), // Replace `generateUniqueId()` with the actual logic to generate a unique ID
      });
      return newAsset;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), asset: createAIDemoAssetSchema }))
    .mutation(async ({ input }) => {
      const { id, asset } = input;

      const updatedAsset = await updateAIDemoAsset(id, { ...asset, id }); // Include the 'id' property in the 'asset' object
      return updatedAsset;
    }),
});

// Generate a unique ID for the new asset
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
