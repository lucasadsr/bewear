"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBagIcon, ShoppingBasketIcon } from "lucide-react";

import { getCart } from "@/actions/get-card";
import { formatCentsToBRL } from "@/helpers/money";

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
  const { data: cart, isPending: isCartPending } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  console.log(cart);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="cursor-pointer">
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
            {!isCartPending ? (
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
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantImageUrl={item.productVariant.imageUrl}
                      productVariantTotalPriceInCents={
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

              <Button className="mt-5 cursor-pointer rounded-full">
                Finalizar compra
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
