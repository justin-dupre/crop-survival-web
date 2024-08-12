import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { MainNav } from "~/components/nav";
import { UserAccountNav } from "~/components/user-account-nav";
import { getCurrentUser } from "~/lib/session";
import Link from "next/link";
import { Toaster } from "~/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Crop Survival",
  description: "Crop Survival | Will your crops survive the night?",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="container flex h-16 items-center justify-between py-4">
              <MainNav />
              {user ? (
                <UserAccountNav
                  user={{
                    name: user.name,
                    image: user.image,
                    email: user.email,
                  }}
                />
              ) : (
                <Link
                  href={"/api/auth/signin"}
                  className=""
                >
                  {"Sign in"}
                </Link>
              )}
            </div>
            {children}
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
