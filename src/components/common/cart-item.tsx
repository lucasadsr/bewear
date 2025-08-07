import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { decreaseCartItemQuantity } from "@/actions/decrease-cart-product-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantTotalPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantTotalPriceInCents,
  quantity,
}: CartItemProps) {
  const queryClient = useQueryClient();

  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto removido do carrinho");
    },
    onError: () => {
      toast.error("Erro ao remover produto do carrinho");
    },
  });

  const decreaseProductQuantityMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => decreaseCartItemQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Quantidade do produto diminuída");
    },
    onError: () => {
      toast.error("Erro ao diminuir quantidade do produto");
    },
  });

  const increaseProductQuantityMutation = useMutation({
    mutationKey: ["increase-cart-product-quantity"],
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Quantidade do produto aumentada");
    },
    onError: () => {
      toast.error("Erro ao aumentar quantidade do produto");
    },
  });

  function handleDeleteClick() {
    removeProductFromCartMutation.mutate();
  }

  function handleDecreaseQuantity() {
    decreaseProductQuantityMutation.mutate();
  }
  function handleIncreaseQuantity() {
    increaseProductQuantityMutation.mutate();
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[70px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4 cursor-pointer"
              variant="ghost"
              onClick={handleDecreaseQuantity}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4 cursor-pointer"
              variant="ghost"
              onClick={handleIncreaseQuantity}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDeleteClick}
          disabled={removeProductFromCartMutation.isPending}
          className="cursor-pointer"
        >
          {removeProductFromCartMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantTotalPriceInCents)}
        </p>
      </div>
    </div>
  );
}
