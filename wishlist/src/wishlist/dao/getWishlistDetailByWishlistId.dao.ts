import { eq, and } from "drizzle-orm";
import { db } from "../../../src/db";
import * as schema from "../../../db/schema/wishlistDetail";

export const getWishlistDetailByWishlistId = async (wishlist_id: string) => {
  const result = await db
    .select()
    .from(schema.wishlistDetail)
    .where(and(eq(schema.wishlistDetail.wishlist_id, wishlist_id)));
  return result?.[0];
};
