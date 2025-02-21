import { db } from "../../../src/db";
import { eq, and } from "drizzle-orm";
import * as schema from "../../../db/schema/cart";

export const editCartDataById = async (
  tenant_id: string,
  cart_id: string,
  data: {
    quantity?: number;
  }
) => {
  const result = await db
    .update(schema.cart)
    .set({
      quantity: data.quantity,
    })
    .where(
      and(eq(schema.cart.tenant_id, tenant_id), eq(schema.cart.id, cart_id))
    )
    .returning({
      id: schema.cart.id,
      product_id: schema.cart.product_id,
      quantity: schema.cart.quantity,
    });
  return result?.[0];
};
