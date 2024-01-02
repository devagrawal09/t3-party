import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import {
  ClerkProvider,
  MultisessionAppSupport,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Serverlespresso Cafe",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <MultisessionAppSupport>
        <html lang="en">
          <body className={`font-sans ${inter.variable}`}>
            <TRPCReactProvider headers={headers()}>
              <header className="flex p-4">
                <div className="grow"></div>
                <UserButton />
                <SignedOut>
                  <SignInButton>
                    <button className="rounded bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-700">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </header>
              <main className="flex flex-col items-center p-16 pt-4">
                <Link href="/">
                  <h1 className="mb-8 text-3xl">Serverlesspresso</h1>
                </Link>
                <div className="m-4">{children}</div>
              </main>
            </TRPCReactProvider>
          </body>
        </html>
      </MultisessionAppSupport>
    </ClerkProvider>
  );
}