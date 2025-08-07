import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductList } from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductVariantPage({
  params,
}: ProductVariantPageProps) {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <div className="lg:hidden">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-6">
          <div>
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              sizes="50vw"
              height={0}
              width={0}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col space-y-6">
            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
            />

            <div>
              <h2 className="text-2xl font-semibold">
                {productVariant.product.name}
              </h2>
              <h3 className="text-muted-foreground text-lg">
                {productVariant.name}
              </h3>
              <h3 className="mt-2 text-2xl font-semibold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>

            <ProductActions productVariantId={productVariant.id} />

            <div>
              <p className="text-lg text-shadow-amber-600">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="px-5">
            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
            />
          </div>

          <div className="px-5">
            <h2 className="text-lg font-semibold">
              {productVariant.product.name}
            </h2>
            <h3 className="text-muted-foreground text-sm">
              {productVariant.name}
            </h3>
            <h3 className="text-lg font-semibold">
              {formatCentsToBRL(productVariant.priceInCents)}
            </h3>
          </div>

          <ProductActions productVariantId={productVariant.id} />

          <div className="px-5">
            <p className="text-shadow-amber-600">
              {productVariant.product.description}
            </p>
          </div>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
}
