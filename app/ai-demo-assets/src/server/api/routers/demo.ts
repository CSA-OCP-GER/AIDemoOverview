import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export interface demo {
  name: string;
  description: string;
  area: string;
  image: string;
  industries?: string[];
  demoType?: string;
}

const aidemos: demo[] = [
  {
    name: "Azure Cognitiv Services",
    description: "Lorem ipsum et delor, et suminur de color estrandum sunt.",
    area: "Microsoft Azure",
    image: "/icons/10162-icon-service-Cognitive-Services.svg",
    industries: ["Retail", "Education", "Healthcare"], // Example industries
    demoType: "Klick-Demo",
  },
  {
    name: "Azure Machine Learning",
    description: "Lorem ipsum et delor, et suminur de color estrandum sunt.",
    area: "Microsoft Azure",
    image: "/icons/10166-icon-service-Machine-Learning.svg",
    industries: ["Retail"], // Example industries
    demoType: "Video-Demo",
  },
  {
    name: "Azure Bot Service",
    description: "Lorem ipsum et delor, et suminur de color estrandum sunt.",
    area: "Microsoft Azure",
    image: "/icons/10162-icon-service-Cognitive-Services.svg",
    industries: ["Finance", "Retail"], // Example industries
    demoType: "Code-Demo",
  },
  {
    name: "Azure Cognitive Search",
    description: "Lorem ipsum et delor, et suminur de color estrandum sunt.",
    area: "Microsoft Azure",
    image: "/icons/10162-icon-service-Cognitive-Services.svg",
    demoType: "Presentation",
  },
  {
    name: "Azure Custom Vision",
    description: "Lorem ipsum et delor, et suminur de color estrandum sunt.",
    area: "Microsoft Azure",
    image: "/icons/10162-icon-service-Cognitive-Services.svg",
  },
  {
    name: "Azure Form Recognizer",
    description: "Lorem ipsum et delor, et suminur de color estrandum sunt.",
    area: "Microsoft Azure",
    image: "/icons/10162-icon-service-Cognitive-Services.svg",
    demoType: "Klick-Demo",
  },
  {
    name: "Azure Personalizer",
    description: "Lorem ipsum et delor, et suminur de color estrandum sunt.",
    area: "Microsoft Azure",
    image: "/icons/10162-icon-service-Cognitive-Services.svg",
  },
];

export const demosRouter = createTRPCRouter({

  demos: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => { // Add 'async' keyword here
      if (!input.text) {
        return aidemos;
      }
      return aidemos.filter((demo) => demo.name.toLowerCase().includes(input.text.toLowerCase()));
    }
    ),
});
