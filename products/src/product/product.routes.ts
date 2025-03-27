import express from "express";
import { validate, verifyJWTProduct } from "../middleware/";
import * as Validation from "./validation";
import * as Handler from "./product.handler";

const router = express.Router();

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all available products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "Strings"
 *                       tenant_id:
 *                         type: string
 *                         example: "Strings"
 *                       name:
 *                         type: string
 *                         example: "Strings"
 *                       description:
 *                         type: string
 *                         example: "Strings"
 *                       price:
 *                         type: number
 *                         example: int
 *                       quantity_available:
 *                         type: number
 *                         example: int
 *                       category_id:
 *                         type: string
 *                         example: "Strings"
 */

router.get("/v1", Handler.getAllProductsHandler); //v1

/**
 * @swagger
 * /api/product/category:
 *   get:
 *     summary: Get all product categories
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "Strings"
 *                       name:
 *                         type: string
 *                         example: "Strings"
 *                       tenant_id:
 *                         type: string
 *                         example: "Strings"
 */
router.get("/v1/category", Handler.getAllCategoryHandler); //v1

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
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
 *                 name:
 *                   type: string
 *                   example: "Strings"
 *                 description:
 *                   type: string
 *                   example: "Strings"
 *                 price:
 *                   type: number
 *                   example: int
 *                 quantity_available:
 *                   type: number
 *                   example: int
 *                 category_id:
 *                   type: string
 *                   example: "Strings"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 */
router.get(
  "/v2/:id",
  validate(Validation.getProductByIdSchema),
  Handler.getProductByIdHandler
); //v2

/**
 * @swagger
 * /api/product/many:
 *   post:
 *     summary: Get multiple products by their IDs
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productIds
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ["Strings"]
 *     responses:
 *       200:
 *         description: Product list retrieved successfully
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
 *                   name:
 *                     type: string
 *                     example: "Strings"
 *                   description:
 *                     type: string
 *                     example: "Strings"
 *                   price:
 *                     type: number
 *                     example: int
 *                   quantity_available:
 *                     type: number
 *                     example: int
 *                   category_id:
 *                     type: string
 *                     example: "Strings"
 */
router.post(
  "/v1/many",
  validate(Validation.getManyProductDatasByIdSchema),
  Handler.getManyProductDatasByIdHandler
); //v1

/**
 * @swagger
 * /api/product/category/{category_id}:
 *   get:
 *     summary: Get products by category ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID to filter products
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "Strings"
 *                       tenant_id:
 *                         type: string
 *                         example: "Strings"
 *                       name:
 *                         type: string
 *                         example: "Strings"
 *                       description:
 *                         type: string
 *                         example: "Strings"
 *                       price:
 *                         type: number
 *                         example: int
 *                       quantity_available:
 *                         type: number
 *                         example: int
 *                       category_id:
 *                         type: string
 *                         example: "Strings"
 *       500:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error Category not found
 */

router.get(
  "/v2/category/:category_id",
  validate(Validation.getProductByCategorySchema),
  Handler.getProductByCategoryHandler
); //v2

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Product]
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
 *               - description
 *               - price
 *               - quantity_available
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Strings"
 *               description:
 *                 type: string
 *                 example: "Strings"
 *               price:
 *                 type: number
 *                 example: int
 *               quantity_available:
 *                 type: number
 *                 example: int
 *     responses:
 *       200:
 *         description: Product created successfully
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
 *                 description:
 *                   type: string
 *                   example: "Strings"
 *                 price:
 *                   type: number
 *                   example: int
 *                 quantity_available:
 *                   type: number
 *                   example: int
 *       401:
 *         description: Invalid token
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
  "/v1",
  verifyJWTProduct,
  validate(Validation.createProductSchema),
  Handler.createProductHandler
); //v1

/**
 * @swagger
 * /api/product/category:
 *   post:
 *     summary: Create a new product category (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Product]
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
 *         description: Category created successfully
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
 *         description: Invalid token
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
  "/v2/category",
  verifyJWTProduct,
  validate(Validation.createCategorySchema),
  Handler.createCategoryHandler
);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Edit a product by ID (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - quantity_available
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Strings"
 *               description:
 *                 type: string
 *                 example: "Strings"
 *               price:
 *                 type: number
 *                 example: int
 *               quantity_available:
 *                 type: number
 *                 example: int
 *               category_id:
 *                 type: string
 *                 format: uuid
 *                 example: "Strings"
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                 description:
 *                   type: string
 *                   example: "Strings"
 *                 price:
 *                   type: number
 *                   example: int
 *                 quantity_available:
 *                   type: number
 *                   example: int
 *                 category_id:
 *                   type: string
 *                   example: "Strings"
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: Foreign key constraint error (invalid category_id)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error insert or update on table "products" violates foreign key constraint "products_category_id_fkey"
 */
router.put(
  "/v1/:id",
  verifyJWTProduct,
  validate(Validation.editProductSchema),
  Handler.editProductHandler
);

/**
 * @swagger
 * /api/product/category/{category_id}:
 *   put:
 *     summary: Edit a product category by ID (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the category to update
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
 *         description: Category updated successfully
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
 *         description: Invalid token
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
  "/v1/category/:category_id",
  verifyJWTProduct,
  validate(Validation.editCategorySchema),
  Handler.editCategoryHandler
);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product by ID (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Product ID to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *                 name:
 *                   type: string
 *                   example: "Strings"
 *                 description:
 *                   type: string
 *                   example: "Strings"
 *                 price:
 *                   type: number
 *                   example: int
 *                 quantity_available:
 *                   type: number
 *                   example: int
 *                 category_id:
 *                   type: string
 *                   example: "Strings"
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 */
router.delete(
  "/v1/:id",
  verifyJWTProduct,
  validate(Validation.deleteProductSchema),
  Handler.deleteProductHandler
);

/**
 * @swagger
 * /api/product/category/{category_id}:
 *   delete:
 *     summary: Delete a product category by ID (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *                 tenant_id:
 *                   type: string
 *                   example: "Strings"
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category not found
 */
router.delete(
  "/v1/category/:category_id",
  verifyJWTProduct,
  validate(Validation.deleteCategorySchema),
  Handler.deleteCategoryHandler
);

export default router;
