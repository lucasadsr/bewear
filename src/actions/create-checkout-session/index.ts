"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateCheckoutSessionSchema,
  createCheckoutSessionSchema,
} from "./schema";

export async function createCheckoutSession(data: CreateCheckoutSessionSchema) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not defined");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }

  const { orderId } = createCheckoutSessionSchema.parse(data);
  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });
  if (!order) {
    throw new Error("Order not found");
  }

  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, order.id),
    with: {
      productVariant: {
        with: {
          product: true,
        },
      },
    },
  });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((item) => {
      return {
        price_data: {
          currency: "BRL",
          product_data: {
            name: `${item.productVariant.product.name} - ${item.productVariant.name}`,
            description: item.productVariant.product.description,
            images: [item.productVariant.imageUrl],
          },
          unit_amount: item.productVariant.priceInCents,
        },
        quantity: item.quantity,
      };
    }),
  });

  return checkoutSession;
}
