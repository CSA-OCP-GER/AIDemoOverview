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
      <div className="relative z-10">
        {/* flex vertical  */}
        <div className="h-[calc(100vh-4rem)] overflow-hidden">
          <InteractiveIndustryMap />
        </div>
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
