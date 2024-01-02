/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WNMhBPg6FmU
 */
import Link from "next/link";
import Image from "next/image";
import { CodeSample1, CodeSample2 } from "./sample";
import ablyLogo from "./vendors/ably.png";
import amptLogo from "./vendors/ampt.svg";
import awsLogo from "./vendors/aws.png";
import convexLogo from "./vendors/convex.svg";
import firebaseLogo from "./vendors/firebase.svg";
import partykitLogo from "./vendors/partykit.svg";
import supabaseLogo from "./vendors/supabase.png";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <CloudLightningIcon className="h-6 w-6" />
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full border-y pt-12 md:pt-24 lg:pt-32">
          <div className="space-y-10 px-4 md:px-6 xl:space-y-16">
            <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  &lt;Plug&gt;
                </h1>
                <h2 className="mt-2 text-xl font-medium tracking-tighter sm:text-2xl md:text-3xl xl:text-[2.25rem] 2xl:text-[2.5rem]">
                  The first Realtime Server Component
                </h2>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Drop-in realtime capabilities for your Next.js app. Works with
                  any realtime infrastructure.
                </p>
                <div className="space-x-4">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="#"
                  >
                    Coming Soon
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Three steps to realtime
                  </h2>
                </div>
              </div>
              <div className="mx-auto grid items-start gap-8 px-4 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Create a Plug</h3>
                  <p className="text-sm text-gray-500">
                    anywhere in a Server Component with a unique identifier
                  </p>
                  <CodeSample1 />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Revalidate Plug</h3>
                  <p className="text-sm text-gray-500">
                    anywhere in a Server Action with the plug's unique
                    identifier
                  </p>
                  <CodeSample2 />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Configure Plug</h3>
                  <p className="text-sm text-gray-500">
                    with one of the many available adapters
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Image src={partykitLogo} alt="partykit" height={25} />
                    <Image src={ablyLogo} alt="ably" height={32} />
                    <Image src={awsLogo} alt="aws" height={32} />
                    <Image src={convexLogo} alt="convex" height={32} />
                    <Image src={firebaseLogo} alt="firebase" height={32} />
                    <Image src={supabaseLogo} alt="supabase" height={32} />
                    <Image src={amptLogo} alt="ampt" height={32} />
                    ...and more
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

function CloudLightningIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}
