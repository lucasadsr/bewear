import { desc } from "drizzle-orm";
import Image from "next/image";

import { CategorySelector } from "@/components/common/category-selector";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { PartnersList } from "@/components/common/partners-list";
import { ProductList } from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany();

  return (
    <>
      <Header />

      <div className="space-y-6">
        <div className="space-y-6 lg:grid lg:grid-cols-5 lg:gap-8 lg:space-y-0 lg:px-8">
          <div className="px-5 lg:col-span-2 lg:px-0">
            <Image
              src="/banner-01.png"
              alt="Leve uma vida com estilo"
              width={0}
              height={0}
              sizes="100vw"
              quality={100}
              className="h-auto w-full rounded-lg lg:aspect-auto lg:rounded-xl"
            />
          </div>

          <div className="lg:col-span-3">
            <PartnersList />
          </div>
        </div>

        <ProductList title="Mais vendidos" products={products} />

        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 lg:px-8">
          <div className="px-5 lg:px-0">
            <CategorySelector categories={categories} />
          </div>

          <div className="px-5 lg:px-0">
            <Image
              src="/banner-02.png"
              alt="Seja auténtico"
              width={0}
              height={0}
              sizes="100vw"
              quality={100}
              className="h-auto w-full rounded-lg lg:rounded-xl"
            />
          </div>
        </div>

        <ProductList title="Novidades" products={newlyCreatedProducts} />

        <Footer />
      </div>
    </>
  );
}
