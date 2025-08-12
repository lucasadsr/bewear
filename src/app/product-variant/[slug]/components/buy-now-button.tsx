"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

interface BuyNowButtonProps {
  productVariantId: string;
  quantity: number;
}

const BuyNowButton = ({ productVariantId, quantity }: BuyNowButtonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      router.push("/cart/identification");
    },
  });
  return (
    <Button
      className="cursor-pointer rounded-full"
      size="lg"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Comprar agora
    </Button>
  );
};

export default BuyNowButton;
