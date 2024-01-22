import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "AI-Demo Assets",
  description: "AI-Demo Assets for awesome demos around Microsoft AI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`font-sans ${inter.variable} h-full`}>
        <>
          <TRPCReactProvider>
            <div className="min-h-full">
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
