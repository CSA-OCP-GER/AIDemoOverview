import DemoTable from "~/server/components/table";

export default async function Page() {

  return (
    <div>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-0 pt-10">
          <div className="">
            <div>
              {/* Centered Search Input Field */}

              <div className="flex flex-col justify-center">
              
                <div className="flex justify-center">
                  
                  <div className="relative">
                  
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {/* Heroicon name: solid/search */}
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.25 1.5a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM15.56 14.06l-3.81-3.81a5.25 5.25 0 111.06-1.06l3.81 3.81a.75.75 0 11-1.06 1.06z"
                        />
                      </svg>
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </div>
              </div>

              {/* Search results */}
              <DemoTable  />



            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
