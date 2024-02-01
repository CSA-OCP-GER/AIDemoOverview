import DemoTable from "~/server/components/table";
import Search from "../_components/search";
import { getServerAuthSession } from "~/server/auth";

import CreateDemoAssetButton from "../_components/adminActions";
import DemoList from "~/server/components/list";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await getServerAuthSession();

  return (
    <>
      <div>
        <main>
          <div className="mx-auto max-w-7xl pt-10 sm:px-6 lg:px-0">
            <div className="">
              <div>
                {/* Centered Search Input Field */}

                <div className="flex flex-col justify-center">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        {/* Heroicon name: solid/search */}
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.25 1.5a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM15.56 14.06l-3.81-3.81a5.25 5.25 0 111.06-1.06l3.81 3.81a.75.75 0 11-1.06 1.06z"
                          />
                        </svg>
                      </div>
                      <Search placeholder="Search for a demo" />
                    </div>
                  </div>
                </div>

                {/* Create Demo Asset Button */}
                {session?.user ? (
                  <CreateDemoAssetButton />
                ) : null}

                {/* Search results */}
                <DemoList searchParams={searchParams} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
