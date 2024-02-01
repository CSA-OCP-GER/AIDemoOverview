import { promises as fs } from 'fs';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


export const imageRouter =  createTRPCRouter({

  getImages: protectedProcedure.query(async () => {
    const images = await readImages()
    return images;
  }),


});

const readImages = async () => {
  // get all filenames in the public/icons folder
  const images = await fs.readdir('./public/icons')
  
  return images;
}