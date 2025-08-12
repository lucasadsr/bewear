"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";
import BuyNowButton from "./buy-now-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="my-4">
      <div className="mb-4 px-5 lg:px-0">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDecrement}
              className="cursor-pointer"
            >
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleIncrement}
              className="cursor-pointer"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-5 lg:px-0">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <BuyNowButton productVariantId={productVariantId} quantity={quantity} />
      </div>
    </div>
  );
};

export default ProductActions;
