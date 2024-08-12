"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "~/lib/utils";
import { Icons } from "~/components/icons";
import { Session } from "next-auth";

interface MainNavProps {
  session: Session | null;
}

export function MainNav(props: MainNavProps) {
  const segment = useSelectedLayoutSegment();

  const items = [
    {
      title: "Home",
      href: "/",
      disabled: false,
    },
    {
      title: "Feedback",
      href: "feedback",
      disabled: false,
    },
  ];

  const refreshItems = [];

  if (props.session?.user?.admin) {
    refreshItems.push({
      title: "View All Feedback",
      href: "/all-feedback",
      disabled: false,
    });
  }

  return (
    <div className="flex gap-6 p-5 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.leaf />
        <span className="hidden font-bold sm:inline-block">Crop Survival</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80",
              )}
            >
              {item.title}
            </Link>
          ))}
          {refreshItems.map((item, index) => (
            <a
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80",
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
