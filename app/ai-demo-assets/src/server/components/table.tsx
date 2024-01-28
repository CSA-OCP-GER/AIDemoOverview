import Image from "next/image";

import { api } from "~/trpc/server";
import { Suspense } from "react";

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

export default async function DemoTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query ?? "";


  const aidemos = await api.aiDemoAssets.getAll.query({ text: query });



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
        {/* Table view for non-mobile screens */}
        <div className="hidden sm:block">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Topic
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Industries
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {aidemos.map((demo) => (
                      <tr key={demo.name}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              { demo.image && (
                              <Image
                                className="h-8 w-8 rounded-full"
                                src={`/icons/${demo.image}`}
                                alt=""
                                width={32}
                                height={32}
                              />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {demo.name}
                              </div>
                              <div className="mt-1 text-gray-500">
                                {/* {demo.area} */}
                                Area
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-wrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {demo.description}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {demo.industries?.map((industry, index) => (
                            <span
                              key={index}
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                industryColors.find((i) => i.name === industry)
                                  ?.color
                              }`}
                            >
                              {industry}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* List view for mobile screens */}
        <div className="sm:hidden">
          <div className="mt-8 flow-root">
            <ul className="divide-y divide-gray-200">
              {aidemos.map((demo) => (
                <li key={demo.name} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      { demo.image && (
                         <Image
                         className="h-8 w-8 rounded-full"
                         src={`/icons/${demo.image}`}
                         alt=""
                         width={32}
                         height={32}
                       />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {demo.name}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {/* {demo.area} */}
                        Area
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {demo.description}
                      </p>
                      {demo.industries?.map((industry, index) => (
                        <span
                          key={index}
                          className={`mr-2 mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(industry)}`}
                        >
                          {industry}
                        </span>
                      ))}

                      {/* {demo.demoType && (
                        <span
                          className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDemoTypeColor(demo.demoType)}`}
                        >
                          {demo.demoType}
                        </span>
                      )} */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
