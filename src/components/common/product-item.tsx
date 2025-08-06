import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

export function ProductItem({
  product,
  textContainerClassName,
}: ProductItemProps) {
  const firstVariant = product.variants[0];

  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-[1.5rem]"
      />
      <div
        className={cn(
          "flex max-w-[150px] flex-col gap-1",
          textContainerClassName,
        )}
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-xm text-muted-foreground truncate">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
}
