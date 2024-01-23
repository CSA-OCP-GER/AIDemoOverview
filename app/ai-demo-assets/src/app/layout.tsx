import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "AI-Demo Assets",
  description: "AI-Demo Assets for awesome demos around Microsoft AI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerAuthSession();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="google-site-verification" content="ZceQb5YZyLG_rNO44pH9OqH7NzY26lsCHMm2HbT-wTQ" />
      </head>
      <body className={`font-sans ${inter.variable} h-full`}>
        <>
          <TRPCReactProvider>
            <div className="min-h-full">
              <Navbar authenticated={!!session?.user} />
              <div className="py-10">
                <main>
                  <div className="mx-auto max-w-7xl sm:px-6 lg:px-12">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </TRPCReactProvider>
        </>
      </body>
    </html>
  );
}
