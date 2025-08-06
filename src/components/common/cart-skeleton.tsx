import { CartItemSkeleton } from "./cart-item-skeleton";

export function CartSkeleton() {
  return (
    <div className="flex h-full flex-col gap-8">
      {/* Render 3 cart item skeletons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}
    </div>
  );
}
