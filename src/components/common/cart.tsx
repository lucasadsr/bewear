"use client";

import { ShoppingBagIcon, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CartItem } from "./cart-item";
import { CartSkeleton } from "./cart-skeleton";

export function Cart() {
  const { data: cart, isPending: isCartPending } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className="relative cursor-pointer"
        >
          {cart?.items && cart.items.length > 0 && (
            <span className="bg-primary absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
              {cart.items.length}
            </span>
          )}
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-2">
              <ShoppingBagIcon strokeWidth="1" />
              <span className="text-lg font-semibold">Sacola</span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            {isCartPending ? (
              <ScrollArea className="h-full">
                <CartSkeleton />
              </ScrollArea>
            ) : (
              <ScrollArea className="h-full">
                <div className="flex h-full flex-col gap-8">
                  {cart?.items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      productVariantId={item.productVariant.id}
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantImageUrl={item.productVariant.imageUrl}
                      productVariantPriceInCents={
                        item.productVariant.priceInCents * item.quantity
                      }
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {cart && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Entrega</p>
                <p className="text-green-700 uppercase">Grátis</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Total</p>
                <p className="text-green-700 uppercase">
                  {formatCentsToBRL(cart.totalPriceInCents ?? 0)}
                </p>
              </div>

              <Button
                className="mt-5 cursor-pointer rounded-full"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href={"/cart/identification"}>Finalizar compra</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
