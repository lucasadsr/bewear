"use client";
import { CartSummary } from "@/app/cart/components/cart-summary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { orderTable } from "@/db/schema";

interface OrderProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}
export function Orders({ orders }: OrderProps) {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-col gap-1">
                    {order.status === "paid" && <Badge>Pago</Badge>}
                    {order.status === "pending" && (
                      <Badge variant="outline">Pagamento Pendente</Badge>
                    )}
                    {order.status === "canceled" && (
                      <Badge variant="destructive">Pago</Badge>
                    )}
                    <div className="flex items-center justify-between">
                      <p>
                        Pedido feito em{" "}
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}{" "}
                        às{" "}
                        {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CartSummary
                    subtotalInCents={order.totalPriceInCents}
                    totalInCents={order.totalPriceInCents}
                    products={order.items.map((item) => ({
                      id: item.id,
                      name: item.productName,
                      variantName: item.productVariantName,
                      quantity: item.quantity,
                      priceInCents: item.priceInCents,
                      imageUrl: item.imageUrl,
                    }))}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
