import { getAllCartItems } from "../../cart/dao/getAllCartItems.dao";
import {
  InternalServerErrorResponse,
  BadRequestResponse,
  NotFoundResponse,
} from "../../../src/commons/patterns";
import { createOrder } from "../dao/createOrder.dao";
import axios, { AxiosResponse } from "axios";
import { User, Product } from "../../../types";

export const placeOrderService = async (
  user: User,
  shipping_provider: string
) => {
  console.log("Starting placeOrderService", { user, shipping_provider });

  try {
    const SERVER_TENANT_ID = process.env.TENANT_ID;
    console.log("SERVER_TENANT_ID:", SERVER_TENANT_ID);

    if (!SERVER_TENANT_ID) {
      console.log("Error: Server tenant ID not found");
      return new InternalServerErrorResponse(
        "Server tenant id not found"
      ).generate();
    }

    if (
      !["JNE", "TIKI", "SICEPAT", "GOSEND", "GRAB_EXPRESS"].includes(
        shipping_provider
      )
    ) {
      console.log("Error: Shipping provider not found", { shipping_provider });
      return new NotFoundResponse("Shipping provider not found").generate();
    }

    if (!user.id) {
      console.log("Error: User ID not found", { user });
      return new InternalServerErrorResponse("User id not found").generate();
    }

    // get the cart items
    console.log("Fetching cart items for user:", user.id);
    const cartItems = await getAllCartItems(SERVER_TENANT_ID, user.id);
    console.log("Cart items retrieved:", cartItems);

    // get the product data
    const productIds = cartItems.map((item) => item.product_id);
    console.log("Product IDs to fetch:", productIds);

    if (productIds.length === 0) {
      console.log("Error: Cart is empty");
      return new BadRequestResponse("Cart is empty").generate();
    }

    const products: AxiosResponse<Product[], any> = await axios.post(
      `http://localhost:8890/api/product/many`,
      { productIds }
    );
    console.log("Products retrieved:", products.data);

    if (products.status !== 200) {
      console.log("Error: Failed to retrieve products from API");
      return new InternalServerErrorResponse(
        "Failed to get products"
      ).generate();
    }

    // create order
    console.log("Creating order...");
    console.log("ini products.data: ", products.data);
    const order = await createOrder(
      SERVER_TENANT_ID,
      user.id,
      cartItems,
      products.data,
      shipping_provider as
        | "JNE"
        | "TIKI"
        | "SICEPAT"
        | "GOSEND"
        | "GRAB_EXPRESS"
    );
    console.log("Order created successfully:", order);

    return {
      data: order,
      status: 201,
    };
  } catch (err: any) {
    console.error("Error in placeOrderService:", err);
    return new InternalServerErrorResponse("Internal Server Error").generate();
  }
};
