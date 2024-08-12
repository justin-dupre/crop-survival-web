import Link from "next/link";

import { HydrateClient } from "~/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";


import Gallery from "~/components/gallery";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Crop <span className="text-primary">Survival</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              href='https://www.dropbox.com/s/mn4um4li2akjqcr/CropSurvival.exe?dl=1'
              target='_blank'
              rel='noopener noreferrer'
              className="flex max-w-xs flex-col gap-4 rounded-xl p-4"
              download
            >
              <Card>
                <CardHeader>
                  <CardTitle>Download →</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Download the most recently published version.</p>
                </CardContent>
              </Card>
            </Link>

            <Link
              href="/feedback"
              className="flex max-w-xs flex-col gap-4 rounded-xl p-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Feedback →</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Submit feedback to the developer.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          {/* <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
                {session && <Image src={session.user?.image ?? ''} alt="User Profile Image" width={20} height={20}/>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div> */}

          {/* {session?.user && <LatestPost />} */}
          <Gallery
            images={[
              { url: "/images/game-1.png" },
              { url: "/images/game-2.png" },
              { url: "/images/game-2.png" },
            ]}
          />
        </div>
      </main>
    </HydrateClient>
  );
}
