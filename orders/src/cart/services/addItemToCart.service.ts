import { NewCart } from "../../../db/schema/cart";
import {
  InternalServerErrorResponse,
  NotFoundResponse,
} from "../../../src/commons/patterns";
import { addItemToCart } from "../dao/addItemToCart.dao";
import { User } from "../../../types";
import axios, { AxiosResponse } from "axios";

export const addItemToCartService = async (
  user: User,
  product_id: string,
  quantity: number
) => {
  try {
    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return new InternalServerErrorResponse("Tenant ID not found").generate();
    }

    if (!user.id) {
      return new NotFoundResponse("User not found").generate();
    }

    // Validate that the product exists by calling the product service.
    try {
      const productResponse: AxiosResponse = await axios.get(
        `${process.env.PRODUCT_MS_URL}/${product_id}`
      );

      // Ensure the product service returned a valid product.
      console.log("ini productresponse.status: ", productResponse.status);
      if (productResponse.status !== 200) {
        return new NotFoundResponse("Product not found").generate();
      }
    } catch (error: any) {
      // If the error response indicates the product was not found, handle it.
      if (error.response && error.response.status === 404) {
        return new NotFoundResponse("Product not found").generate();
      }
      // Otherwise, throw the error to be caught by the outer catch.
      throw error;
    }

    // Proceed to add the item to the cart.
    const cartData: NewCart = {
      tenant_id: SERVER_TENANT_ID,
      user_id: user.id,
      product_id: product_id,
      quantity: quantity,
    };

    const item = await addItemToCart(cartData);

    return {
      data: {
        ...item,
      },
      status: 201,
    };
  } catch (err: any) {
    return new InternalServerErrorResponse(err).generate();
  }
};
