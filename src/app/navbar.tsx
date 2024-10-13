"use client";

import { ForwardedRef, forwardRef, useEffect } from "react";

import { atom, useAtom } from "jotai";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import LavaLearnLogoMark from "~/app/lavalearn-logomark.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
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
      {!href && <ChevronDown className="relative top-[1px] ml-1 h-5 w-5" aria-hidden="true" />}
    </>
  );

  if (href)
    return (
      <Link ref={ref as ForwardedRef<HTMLAnchorElement>} href={href} className={navbarLinkStyles} {...props}>
        {children}
      </Link>
    );
  return (
    <div ref={ref as ForwardedRef<HTMLDivElement>} className={navbarLinkStyles} {...props}>
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
      <HoverCardContent className="p-1" align="end">
        {Object.entries(submenus).map(([title, href], i) => (
          <Link
            key={i}
            href={`/${menu.split(" ")[0].toLowerCase()}/${href}`}
            className={
              "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            }
          >
            <span className="font-medium">{title}</span>
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
        "fixed top-0 z-50 flex h-16 w-full justify-center py-2 transition md:h-20 md:py-4",
        navbarTheme === "black" ? "text-white" : "text-black",
        hasScrolled ? `${navbarTheme === "black" ? "bg-black/70" : "bg-white/80"} backdrop-blur-md` : "bg-transparent"
      )}
    >
      <div className="flex w-full max-w-[96rem] items-center justify-between pl-6 md:pr-0">
        <div className="h-full py-1">
          <Link href="/" className="my-4 inline h-full flex-shrink-0 overflow-hidden">
            <Image priority src={LavaLearnLogoMark} className="h-full w-auto" alt={"LavaLearn Logo"} />
          </Link>
        </div>

        <div className="flex px-6">
          {/* Desktop Navigation */}
          <div className="hidden gap-4 md:flex">
            {menus.map(menu => (
              <NavbarItem key={menu} menu={menu} />
            ))}
            <div className="hidden gap-4 lg:flex">
              <NavbarLink title="FIRESIDE CHATS" href={"fireside-chats"} />
              <NavbarLink title="ABOUT" href={"about"} />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-md bg-background p-2">
                  <Menu className="h-6 w-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 w-56 bg-white" align="end">
                <div className="block md:hidden">
                  {menus.map(menu => (
                    <div key={menu}>
                      <DropdownMenuLabel>{menu.toUpperCase()}</DropdownMenuLabel>
                      <div className="pl-2">
                        {Object.entries(submenus).map(([title, href], i) => (
                          <Link key={i} href={`/${menu.split(" ")[0].toLowerCase()}/${href}`}>
                            <DropdownMenuItem>
                              <span>{title}</span>
                            </DropdownMenuItem>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/fireside-chats">
                  <DropdownMenuItem className="font-bold">FIRESIDE CHATS</DropdownMenuItem>
                </Link>
                <Link href="/about">
                  <DropdownMenuItem className="font-bold">ABOUT</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
