import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-card";

export const getUseCartQueryKey = () => ["cart"] as const;

export function useCart() {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: getCart,
  });
}
