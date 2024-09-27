"use client";

import { atom, useAtom } from "jotai";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ForwardedRef, forwardRef, useEffect } from "react";
import LavaLearnLogoMark from "~/app/lavalearn-logomark.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { menus, submenus } from "~/lib/data";
import useScrollDetection from "~/lib/hooks/useScrollDetection";
import { cn } from "~/lib/utils";

const navbarLinkStyles =
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-md font-medium transition-colors hover:bg-white hover:text-primary focus:outline-none cursor-default";

const NavbarLink = forwardRef<
  HTMLAnchorElement | HTMLDivElement,
  {
    title: string;
    href?: string;
  }
>(({ title, href, ...props }, ref) => {
  const children = (
    <>
      <span>{title}</span>
      {!href && (
        <ChevronDown
          className="relative top-[1px] ml-1 h-5 w-5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href)
    return (
      <Link
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        href={href}
        className={navbarLinkStyles}
        {...props}
      >
        {children}
      </Link>
    );
  return (
    <div
      ref={ref as ForwardedRef<HTMLDivElement>}
      className={navbarLinkStyles}
      {...props}
    >
      {children}
    </div>
  );
});

NavbarLink.displayName = "NavbarLink";

function NavbarItem({ menu }: { menu: string }) {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <NavbarLink title={menu.split(" ")[0].toUpperCase()} />
      </HoverCardTrigger>
      <HoverCardContent className="p-0" align="end">
        {Object.entries(submenus).map(([title, href], i) => (
          <Link
            key={i}
            href={`/${menu.split(" ")[0].toLowerCase()}/${href}`}
            className={cn(
              "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-primary cursor-pointer"
            )}
          >
            <span className="text-sm font-medium leading-none">{title}</span>
          </Link>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}

export const navbarThemeAtom = atom<"black" | "white">("black");

export function NavbarThemeController({ theme }: { theme: "black" | "white" }) {
  const [, setNavbarTheme] = useAtom(navbarThemeAtom);

  useEffect(() => {
    setNavbarTheme(theme);
  }, [theme, setNavbarTheme]);

  return null;
}

export function Navbar() {
  const [navbarTheme] = useAtom(navbarThemeAtom);
  const { hasScrolled } = useScrollDetection();

  return (
    <div
      className={cn(
        "w-full h-20 flex py-4 justify-center fixed z-50 transition top-0 overflow-x-scroll",
        navbarTheme === "black" ? "text-white" : "text-black",
        hasScrolled
          ? `${
              navbarTheme === "black" ? "bg-black/70" : "bg-white/80"
            } backdrop-blur-md`
          : "bg-transparent"
      )}
    >
      <div className="max-w-[96rem] w-full flex items-center justify-between pl-8">
        <Link href="/" className="h-full inline overflow-hidden flex-shrink-0">
          <Image
            priority
            src={LavaLearnLogoMark}
            className="h-full w-auto"
            alt={"LavaLearn Logo"}
          />
        </Link>
        <div className="flex gap-4 px-8">
          {menus.map((menu) => (
            <NavbarItem key={menu} menu={menu} />
          ))}
          <NavbarLink title="FIRESIDE CHATS" href={"fireside-chats"} />
          <NavbarLink title="ABOUT" href={"about"} />
        </div>
      </div>
    </div>
  );
}
