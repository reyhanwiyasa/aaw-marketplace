import { db } from "../../../src/db";
import { eq, and } from "drizzle-orm";
import * as schema from "../../../db/schema/products";
import * as categorySchema from "../../../db/schema/categories";

export const getProductByCategory = async (
  tenantId: string,
  category_id: string
) => {
  // Check if the category exists
  const categoryResult = await db
    .select()
    .from(categorySchema.categories)
    .where(
      and(
        eq(categorySchema.categories.tenant_id, tenantId),
        eq(categorySchema.categories.id, category_id)
      )
    );

  if (categoryResult.length === 0) {
    // If the category is not found, throw an error or handle it as needed.
    throw new Error("Category not found");
  }

  // If the category exists, proceed to get the products.
  const result = await db
    .select()
    .from(schema.products)
    .where(
      and(
        eq(schema.products.tenant_id, tenantId),
        eq(schema.products.category_id, category_id)
      )
    );

  return result;
};
