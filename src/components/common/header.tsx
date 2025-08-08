"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between p-5 lg:px-8 lg:py-6">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="BEWEAR"
          width={100}
          height={26.14}
          className="lg:w-[120px]"
        />
      </Link>

      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer lg:hidden"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 px-5">
              {/* Navegação principal */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/">
                    <HomeIcon className="mr-3 h-4 w-4" />
                    Início
                  </Link>
                </Button>

                {session?.user && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/my-orders">
                      <PackageIcon className="mr-3 h-4 w-4" />
                      Meus Pedidos
                    </Link>
                  </Button>
                )}
              </div>

              {/* Seção do usuário */}
              <div className="border-t pt-4">
                {session?.user ? (
                  <>
                    <div className="flex justify-between space-y-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                    <Button size="icon" asChild variant="outline">
                      <Link href="/authentication">
                        <LogInIcon />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <nav className="hidden lg:flex lg:items-center lg:gap-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Início
            </Link>
          </Button>

          {session?.user && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/my-orders">
                <PackageIcon className="mr-2 h-4 w-4" />
                Meus Pedidos
              </Link>
            </Button>
          )}

          {session?.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image as string | undefined}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.split(" ")?.[0]?.[0]}
                    {session?.user?.name?.split(" ")?.[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold">
                    {session?.user?.name}
                  </h3>
                  <span className="text-muted-foreground block text-xs">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => authClient.signOut()}
              >
                <LogOutIcon />
              </Button>
            </div>
          ) : (
            <Button asChild variant="outline">
              <Link href="/authentication">
                <LogInIcon className="mr-2 h-4 w-4" />
                Fazer Login
              </Link>
            </Button>
          )}
        </nav>

        <Cart />
      </div>
    </header>
  );
};
