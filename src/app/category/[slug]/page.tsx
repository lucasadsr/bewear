import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { ProductItem } from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <div className="space-y-6 px-5 lg:px-8 lg:py-6">
        <h2 className="text-xl font-semibold lg:text-2xl">{category.name}</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              textContainerClassName="max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
