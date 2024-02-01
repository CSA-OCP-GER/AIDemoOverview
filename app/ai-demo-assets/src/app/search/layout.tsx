import { Navbar } from "~/app/_components/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";
import DialogContainer from "../_components/dialogContainer";
import { CreateDemoAsset } from "../_components/createDemoAsset";


export const metadata = {
  title: "AI-Demo Assets",
  description: "AI-Demo Assets for awesome demos around Microsoft AI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();


  async function onClose() {
    "use server";
    console.log("onClose");
  }

  async function onOk() {
    "use server";
    console.log("onOk");
  }


  return (
    <>
      <div className="min-h-full">
        <Navbar authenticated={!!session?.user} />
        <div className="py-10">
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-12">{children}</div>
          </main>
        </div>
      </div>

      <DialogContainer onClose={onClose} onOk={onOk}>
        <CreateDemoAsset />
      </DialogContainer>


    </>
  );
}
