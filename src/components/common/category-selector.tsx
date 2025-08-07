import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export function CategorySelector({ categories }: CategorySelectorProps) {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6 lg:flex lg:h-full lg:flex-col lg:justify-center">
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {categories.map((category) => (
          <Button
            variant="ghost"
            key={category.id}
            className="cursor-pointer rounded-full bg-white hover:bg-white/90 lg:py-3"
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
