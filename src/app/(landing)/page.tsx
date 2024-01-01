/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WNMhBPg6FmU
 */
import Link from "next/link";
import { CodeSample } from "./sample";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <CloudLightningIcon className="h-6 w-6" />
          <span className="sr-only">JS Real-Time Library</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </Link>
        </nav>
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
                  The first Real-time Server Component
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
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  {/* <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">
                    Key Features
                  </div> */}
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Three steps to realtime
                  </h2>
                </div>
              </div>
              <div className="mx-auto grid items-start gap-8 px-4 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Real-time updates</h3>
                  <p className="text-sm text-gray-500">
                    Keep your users informed with live updates.
                  </p>
                  <CodeSample />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Easy integration</h3>
                  <p className="text-sm text-gray-500">
                    Integrate seamlessly with Next.js and Solid Start.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">High performance</h3>
                  <p className="text-sm text-gray-500">
                    Designed to handle high traffic without slowing down.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-gray-500">
            © JS Real-Time Library. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
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
