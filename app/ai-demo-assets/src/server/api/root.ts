import { createTRPCRouter } from "~/server/api/trpc";
import { aiDemoAssetRouter } from "./routers/aiDemoAssetsRouter";
import { magicRouter } from "./routers/magicRouter";
import { imageRouter } from "./routers/imageRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aiDemoAssets: aiDemoAssetRouter,
  magic: magicRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
