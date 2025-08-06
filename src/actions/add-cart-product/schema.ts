import z from "zod";

export const addProductToCartSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1).max(99),
});

export type AddProductToCartSchema = z.infer<typeof addProductToCartSchema>;
