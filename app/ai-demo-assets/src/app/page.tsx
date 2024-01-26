import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import InteractiveIndustryMap from "./_components/InteractiveIndustryMap";
import { Navbar } from "./_components/navbar/navbar";
import Image from "next/image";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div className="min-h-full">
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


      <div className="relative z-10">
      <Navbar authenticated={!!session?.user} />
      </div>
      <div className="py-10 relative z-10">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-12">
            
            <main className="flex flex-col items-center justify-center">
              <div className="container flex flex-col items-center justify-center gap-6  ">
                
                {/* now the main content, an image map */}
                <div className="h-full w-full">
                  <InteractiveIndustryMap />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="text-2xl text-white">
                    {hello ? hello.greeting : "Loading tRPC query..."}
                  </p>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-center text-2xl text-white">
                      {session && (
                        <span>Logged in as {session.user?.name}</span>
                      )}
                    </p>
                    <Link
                      href={session ? "/api/auth/signout" : "/api/auth/signin"}
                      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                    >
                      {session ? "Sign out" : "Sign in"}
                    </Link>
                  </div>
                </div>

                {/* <CrudShowcase /> */}
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
