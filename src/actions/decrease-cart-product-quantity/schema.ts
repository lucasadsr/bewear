import z from "zod";

export const decreaseCartItemQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseCartItemQuantitySchema = z.infer<
  typeof decreaseCartItemQuantitySchema
>;
