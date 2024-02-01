import Image from "next/image";

import { api } from "~/trpc/server";
import { Suspense } from "react";
import Link from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getServerAuthSession } from "~/server/auth";
import ModalCard from "~/app/_components/modalCart";
// for each industry define a color
const industryColors = [
  { name: "Retail", color: "bg-blue-100 text-blue-800" },
  { name: "Education", color: "bg-green-100 text-green-800" },
  { name: "Healthcare", color: "bg-yellow-100 text-yellow-800" },
  { name: "Finance", color: "bg-red-100 text-red-800" },
  { name: "Manufacturing", color: "bg-purple-100 text-purple-800" },
  { name: "Government", color: "bg-indigo-100 text-indigo-800" },
  { name: "Energy", color: "bg-pink-100 text-pink-800" },
  { name: "Transportation", color: "bg-gray-100 text-gray-800" },
  { name: "Media", color: "bg-orange-100 text-orange-800" },
  { name: "Telecommunications", color: "bg-teal-100 text-teal-800" },
  { name: "Agriculture", color: "bg-cyan-100 text-cyan-800" },
  { name: "Other", color: "bg-gray-100 text-gray-800" },

  // add more industries here: Automotive, Banking, B2B, B2C, Chemicals, Construction, Consulting, Consumer Goods, Defense, Electronics, Engineering, Entertainment, Food & Beverage, Hospitality, Insurance, Legal, Machinery, Maritime, Marketing, Mining, Nonprofit, Pharmaceuticals, Real Estate, Security, Shipping, Technology, Utilities, Wholesale
  { name: "Automotive", color: "bg-blue-100 text-blue-800" },
  { name: "Banking", color: "bg-green-100 text-green-800" },
  { name: "B2B", color: "bg-yellow-100 text-yellow-800" },

  // Software Development,
];

// define demo types, for each type define a color
const demoTypes = [
  { name: "Klick-Demo", color: "bg-blue-100 text-blue-800" },
  { name: "Video-Demo", color: "bg-green-100 text-green-800" },
  { name: "Code-Demo", color: "bg-yellow-100 text-yellow-800" },
  { name: "Presentation", color: "bg-red-100 text-red-800" },
  { name: "Other", color: "bg-gray-100 text-gray-800" },
];

export default async function DemoList({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query ?? "";
  const aidemos = await api.aiDemoAssets.getAll.query({ text: query });

  const session = await getServerAuthSession();

  // Filter demos based on publication status and user authentication
  const filteredDemos = aidemos.filter(
    (demo) => session?.user ?? demo.isPublished,
  );

  // Function to get the background color class based on the publication status
  const getBackgroundColor = (isPublished: boolean) => {
    return isPublished ? "bg-white" : "bg-gray-100"; // Using TailwindCSS for example
  };

  const getIndustryColor = (industry: string) => {
    return (
      industryColors.find((i) => i.name === industry)?.color ??
      "bg-gray-100 text-gray-800"
    );
  };

  // Function to get the color class for a given demo type
  const getDemoTypeColor = (demoType: string) => {
    return (
      demoTypes.find((dt) => dt.name === demoType)?.color ??
      "bg-gray-100 text-gray-800"
    );
  };

  return (
    <Suspense key={query} fallback={<div>Loading...</div>}>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Card view */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {filteredDemos.map((demo) => (
              <div
                key={demo.name}
                className={`overflow-hidden rounded-lg shadow ${getBackgroundColor(demo.isPublished)}`}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    {demo.image && (
                      <Image
                        className="h-8 w-8 rounded-sm"
                        src={`/icons/${demo.image}`}
                        alt=""
                        width={32}
                        height={32}
                      />
                    )}
                    <div className="ml-4">
                      <div className="text-lg font-medium leading-6 text-gray-900">
                        {demo.name}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {/* max lengt of description 300 */}
                        {demo.description.length > 180
                          ? demo.description.substring(0, 180) + "..."
                          : demo.description}
                      </p>
                    </div>
                  </div>
                  {/* Industries */}
                  <div className="ml-12 mt-6">
                    {demo.industries?.map((industry, index) => (
                      <span
                        key={index}
                        className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(industry)}`}
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                  {/* Displaying the publication status */}
                  <p
                    className={`ml-12 mt-6 text-xs inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold ${demo.isPublished ? "text-green-800 bg-green-200" : "text-red-800 bg-red-300"}`}
                  >
                    {demo.isPublished ? "Published" : "Unpublished"}
                  </p>

                  <div className="ml-12 flex justify-end">
                    <div className="mt-4 text-right">
                      {/* style as button */}
                      <ModalCard>
                        <div className="mb-16 mt-6 p-4">
                          <div className="flex items-start">
                            {demo.image && (
                              <Image
                                className="h-8 w-8 rounded-sm"
                                src={`/icons/${demo.image}`}
                                alt=""
                                width={32}
                                height={32}
                              />
                            )}
                            <div className="ml-10">
                              <div className="text-lg font-medium leading-6 text-gray-900 md:text-2xl">
                                {demo.name}
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {demo.description}
                              </p>
                            </div>
                          </div>
                          {/* Industries */}
                          <div className="ml-16 mt-6">
                            <div className="ml-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Industries:
                            </div>
                            {demo.industries?.map((industry, index) => (
                              <span
                                key={index}
                                className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(industry)}`}
                              >
                                {industry}
                              </span>
                            ))}
                          </div>
                          {/* Technologies */}

                          <div className="ml-16 mt-4">
                            <div className="ml-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Technologies:
                            </div>
                            {demo.technologies?.map((technology, index) => (
                              <span
                                key={index}
                                className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(technology)}`}
                              >
                                {technology}
                              </span>
                            ))}
                          </div>

                          {/* Audiences */}
                          <div className="ml-16 mt-4">
                            <div className="ml-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Audiences:
                            </div>
                            {demo.audience?.map((audience, index) => (
                              <span
                                key={index}
                                className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(audience)}`}
                              >
                                {audience}
                              </span>
                            ))}
                          </div>

                          {/* KPIs */}
                          <div className="ml-16 mt-4">
                            <div className="ml-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              KPIs:
                            </div>
                            {demo.kpis?.map((kpi, index) => (
                              <span
                                key={index}
                                className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(kpi)}`}
                              >
                                {kpi}
                              </span>
                            ))}
                          </div>

                          {/* Link */}
                          <div className="mt-10">
                            <OpenInNewIcon className="ml-16 h-5 w-5 text-gray-400" />
                            <Link
                              target="_blank"
                              href={demo.link}
                              className="ml-2 text-sm font-semibold text-indigo-600 hover:text-indigo-900"
                            >
                              {demo.name}
                            </Link>
                          </div>
                        </div>
                      </ModalCard>
                    </div>

                    {/* only if authenticated */}
                    {session?.user && (
                      <div className="mt-4 text-right">
                        {/* style as button */}
                        <Link
                          href={`/search?showDialog=true&id=${demo.id}`}
                          className="px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-900 hover:underline"
                        >
                          Edit
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
