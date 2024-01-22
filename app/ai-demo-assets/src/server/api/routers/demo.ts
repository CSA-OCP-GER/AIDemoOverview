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
    description: "This demo shows how to use Azure Cognitive Services.",
    area: "Microsoft Azure",
    image: "/icons/10162-icon-service-Cognitive-Services.svg",
    industries: ["Retail", "Education", "Healthcare"], // Example industries
    demoType: "Klick-Demo",
  },
  {
    name: "Azure Machine Learning",
    description: "Have you ever wondered how to use Azure Machine Learning? This demo shows you how.",
    area: "Microsoft Azure",
    image: "/icons/10166-icon-service-Machine-Learning.svg",
    industries: ["Retail"], // Example industries
    demoType: "Video-Demo",
  },
  {
    name: "Azure Bot Service",
    description: "Do you still talking with you mom? Wait, you don't have to. This demo shows you how to use Azure Bot Service.",
    area: "Microsoft Azure",
    image: "/icons/10162-icon-service-Cognitive-Services.svg",
    industries: ["Finance", "Retail"], // Example industries
    demoType: "Code-Demo",
  },
  {
    name: "Azure Cognitive Search",
    description: "Cognitive Search is a fully managed cloud search service that provides a rich search experience to custom applications.",
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
      // search in name, description, area, industries
      const search = input.text.toLowerCase();
      const results = aidemos.filter((demo) => {
        const name = demo.name.toLowerCase();
        const description = demo.description.toLowerCase();
        const area = demo.area.toLowerCase();
        const industries = demo.industries?.map((industry) => industry.toLowerCase());

        return name.includes(search) || description.includes(search) || area.includes(search) || (industries && industries.includes(search));
      });

      return results;
    }
    ),
});
