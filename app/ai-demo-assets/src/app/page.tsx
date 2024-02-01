import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Navbar } from "./_components/navbar/navbar";
import Image from "next/image";
import InteractiveIndustryMap from "./_components/InteractiveIndustryMap";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();
  const industries = await api.aiDemoAssets.getDistinctIndustries.query();

  return (
    <div className="h-screen bg-slate-600">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          width={2400}
          height={1350}
          src="/piotr-chrobot-6oUsyeYXgTg-unsplash.jpg"
          alt="Industry Map"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-20">
        <Navbar authenticated={!!session?.user} />
      </div>
      <div className="relative">
        {/* flex vertical  */}
        <div className="h-[calc(100vh-4rem)] overflow-hidden flex">
        <div className="text-center my-0 mx-auto mt-20">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl text-purple-100 text-opacity-90">
            AI Demo Assets
          </h2>
          <p className="mt-4 text-md md:text-lg leading-8 text-gray-300 px-10 md:px-20 xl:px-80 z-50">
          Explore the latest AI demo assets to excite your customers with Azure AI, Dynamics 365, Power Platform, and beyond. Access a thoughtfully curated collection of AI demos, each chosen to inspire and reveal practical applications.
          </p>
        </div>

        <InteractiveIndustryMap industries={industries} />

        </div>
      </div>
    </div>
  );
}
