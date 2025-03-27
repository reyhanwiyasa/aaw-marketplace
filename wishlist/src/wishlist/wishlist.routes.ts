import express from "express";
import { validate, verifyJWT } from "../middleware";
import * as Validation from "./validation";
import * as Handler from "./wishlist.handler";

const router = express.Router();
/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get all wishlists for the authenticated user
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlists retrieved successfully
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
 *                   tenant_id:
 *                     type: string
 *                     example: "Strings"
 *                   user_id:
 *                     type: string
 *                     example: "Strings"
 *                   name:
 *                     type: string
 *                     example: "Strings"
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 */
router.get("/", verifyJWT, Handler.getAllUserWishlistHandler);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   get:
 *     summary: Get wishlist item by ID
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the wishlist item to retrieve
 *     responses:
 *       200:
 *         description: Wishlist item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "Strings"
 *                 wishlist_id:
 *                   type: string
 *                   example: "Strings"
 *                 product_id:
 *                   type: string
 *                   example: "Strings"
 *       404:
 *         description: Wishlist is empty or item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist is empty
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 */
router.get(
  "/:id",
  verifyJWT,
  validate(Validation.getWishlistByIdSchema),
  Handler.getWishlistByIdHandler
);

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Create a new wishlist
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Strings"
 *     responses:
 *       201:
 *         description: Wishlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "Strings"
 *                 tenant_id:
 *                   type: string
 *                   example: "Strings"
 *                 user_id:
 *                   type: string
 *                   example: "Strings"
 *                 name:
 *                   type: string
 *                   example: "Strings"
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 */
router.post(
  "/",
  verifyJWT,
  validate(Validation.createWishlistSchema),
  Handler.createWishlistHandler
);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   put:
 *     summary: Update a wishlist by ID
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the wishlist to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Strings"
 *     responses:
 *       200:
 *         description: Wishlist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "Strings"
 *                 name:
 *                   type: string
 *                   example: "Strings"
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 */
router.put(
  "/v1/:id",
  verifyJWT,
  validate(Validation.updateWishlistSchema),
  Handler.updateWishlistHandler
);

/**
 * @swagger
 * /api/wishlist/remove:
 *   delete:
 *     summary: Remove a product from a wishlist
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the wishlist detail to remove
 *                 example: "Strings"
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product removed from wishlist
 *       500:
 *         description: Wishlist detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist detail not found
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 */
router.delete(
  "/v1/remove",
  verifyJWT,
  validate(Validation.removeProductFromWishlistSchema),
  Handler.removeProductFromWishlistHandler
);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     summary: Delete a wishlist by ID
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the wishlist to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Wishlist deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "Strings"
 *                 tenant_id:
 *                   type: string
 *                   example: "Strings"
 *                 user_id:
 *                   type: string
 *                   example: "Strings"
 *                 name:
 *                   type: string
 *                   example: "Strings"
 *       500:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist not found
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 */
router.delete(
  "/v1/:id",
  verifyJWT,
  validate(Validation.deleteWishlistSchema),
  Handler.deleteWishlistHandler
);

/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     summary: Add a product to a wishlist
 *     description: Requires a valid Bearer token (user or admin)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wishlist_id
 *               - product_id
 *             properties:
 *               wishlist_id:
 *                 type: string
 *                 format: uuid
 *                 example: "Strings"
 *               product_id:
 *                 type: string
 *                 format: uuid
 *                 example: "Strings"
 *     responses:
 *       201:
 *         description: Product successfully added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "Strings"
 *                 wishlist_id:
 *                   type: string
 *                   example: "Strings"
 *                 product_id:
 *                   type: string
 *                   example: "Strings"
 *       500:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist not found
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 */
router.post(
  "/v1/add",
  verifyJWT,
  validate(Validation.addProductToWishlistSchema),
  Handler.addProductToWishlistHandler
);

export default router;
