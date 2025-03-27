import express from "express";
import { validate, verifyJWT } from "../middleware";
import * as Validation from "./validation";
import * as Handler from "./cart.handler";

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart items for the authenticated user
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "Strings"
 *                   product_id:
 *                     type: string
 *                     example: "Strings"
 *                   quantity:
 *                     type: number
 *                     example: int
 */
router.get("", verifyJWT, Handler.getAllCartItemsHandler);

/**
 * @swagger
 * /api/cart/v2:
 *   post:
 *     summary: Add a product to the cart
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "Strings"
 *               quantity:
 *                 type: number
 *                 example: int
 *     responses:
 *       200:
 *         description: Product added to cart
 */

router.post(
  "/v2",
  verifyJWT,
  validate(Validation.addItemToCartSchema),
  Handler.addItemToCartHandler
);

/**
 * @swagger
 * /api/cart/v1:
 *   put:
 *     summary: Edit quantity of a product in the cart
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "Strings"
 *               quantity:
 *                 type: number
 *                 example: int
 *     responses:
 *       200:
 *         description: Cart item updated
 */

router.put(
  "/v1",
  verifyJWT,
  validate(Validation.editCartItemSchema),
  Handler.editCartItemHandler
);

/**
 * @swagger
 * /api/cart/v1:
 *   delete:
 *     summary: Remove a product from the cart
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "Strings"
 *     responses:
 *       200:
 *         description: Product removed from cart
 */

router.delete(
  "/v1",
  verifyJWT,
  validate(Validation.deleteCartItemSchema),
  Handler.deleteCartItemHandler
);

export default router;
