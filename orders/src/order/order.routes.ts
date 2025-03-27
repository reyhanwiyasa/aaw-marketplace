import express from "express";
import { validate, verifyJWT } from "../middleware";
import * as Validation from "./validation";
import * as Handler from "./order.handler";

const router = express.Router();
/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: ace314a2-0c06-42da-b7c0-814452c05f2f
 *                   tenant_id:
 *                     type: string
 *                     example: 47dd6b24-0b23-46b0-a662-776158d089ba
 *                   user_id:
 *                     type: string
 *                     example: 573e2fe7-65c9-443e-9951-fe949f0ce08b
 *                   order_date:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-03-06T17:21:18.993Z
 *                   total_amount:
 *                     type: number
 *                     example: 5
 *                   order_status:
 *                     type: string
 *                     example: CANCELLED
 *                   shipping_provider:
 *                     type: string
 *                     example: JNE
 *                   shipping_code:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   shipping_status:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
router.get("/v1", verifyJWT, Handler.getAllOrdersHandler);

/**
 * @swagger
 * /api/order/{orderId}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 866669d2-2fed-4dc0-a76b-e7339d0de95f
 *                 tenant_id:
 *                   type: string
 *                   example: 47dd6b24-0b23-46b0-a662-776158d089ba
 *                 order_id:
 *                   type: string
 *                   example: ace314a2-0c06-42da-b7c0-814452c05f2f
 *                 product_id:
 *                   type: string
 *                   example: fa706d5d-e7c3-455e-b904-fcce61b21888
 *                 quantity:
 *                   type: number
 *                   example: 5
 *                 unit_price:
 *                   type: number
 *                   example: 1
 *       400:
 *         description: Validation failed (e.g. invalid UUID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Invalid uuid
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["params", "orderId"]
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Order detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order detail not found
 */
router.get(
  "/v1/:orderId",
  verifyJWT,
  validate(Validation.getOrderDetailSchema),
  Handler.getOrderDetailHandler
);

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shipping_provider
 *             properties:
 *               shipping_provider:
 *                 type: string
 *                 enum: [JNE, TIKI, SICEPAT, GOSEND, GRAB_EXPRESS]
 *                 example: JNE
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 179f97bf-3f0d-4449-8146-6e14c4adf7c1
 *                     tenant_id:
 *                       type: string
 *                       example: 47dd6b24-0b23-46b0-a662-776158d089ba
 *                     user_id:
 *                       type: string
 *                       example: a3de2f5c-44a0-4eb6-85de-9b987ca7aa14
 *                     order_date:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-27T06:35:28.127Z
 *                     total_amount:
 *                       type: number
 *                       example: 5
 *                     order_status:
 *                       type: string
 *                       example: PENDING
 *                     shipping_provider:
 *                       type: string
 *                       example: JNE
 *                     shipping_code:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     shipping_status:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 orderDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 1ef00b38-810d-4f56-814a-658203aa0749
 *                       tenant_id:
 *                         type: string
 *                         example: 47dd6b24-0b23-46b0-a662-776158d089ba
 *                       order_id:
 *                         type: string
 *                         example: 179f97bf-3f0d-4449-8146-6e14c4adf7c1
 *                       product_id:
 *                         type: string
 *                         example: fa706d5d-e7c3-455e-b904-fcce61b21888
 *                       quantity:
 *                         type: number
 *                         example: 5
 *                       unit_price:
 *                         type: number
 *                         example: 1
 *       400:
 *         description: Cart is empty or validation failed
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Cart is empty
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Validation failed
 *                     errors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           message:
 *                             type: string
 *                             example: Invalid enum value. Expected 'JNE' | 'TIKI' | 'SICEPAT' | 'GOSEND' | 'GRAB_EXPRESS', received 'JNEa'
 *                           path:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["body", "shipping_provider"]
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */

router.post(
  "/v1",
  verifyJWT,
  validate(Validation.placeOrderSchema),
  Handler.placeOrderHandler
);

/**
 * @swagger
 * /api/order/{orderId}/pay:
 *   post:
 *     summary: Pay for an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the order to be paid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - payment_method
 *               - payment_reference
 *               - amount
 *             properties:
 *               payment_method:
 *                 type: string
 *                 example: bank
 *               payment_reference:
 *                 type: string
 *                 example: "123"
 *               amount:
 *                 type: number
 *                 example: 23
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 71085208-cffb-4555-8b41-9bb1c5e41b9c
 *                     order_id:
 *                       type: string
 *                       example: 7ca4bd15-5ba9-4583-a5c5-4614dbdbf33b
 *                     payment_date:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-27T06:37:01.889Z
 *                     payment_method:
 *                       type: string
 *                       example: bank
 *                     payment_reference:
 *                       type: string
 *                       example: "123"
 *                     amount:
 *                       type: number
 *                       example: 23
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 7ca4bd15-5ba9-4583-a5c5-4614dbdbf33b
 *                     order_date:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-06T16:56:31.284Z
 *                     total_amount:
 *                       type: number
 *                       example: 23
 *                     order_status:
 *                       type: string
 *                       example: PAID
 *                     shipping_provider:
 *                       type: string
 *                       example: JNE
 *                     shipping_code:
 *                       type: string
 *                       example: MOCK-SHIPPING-42fd3b9d-f785-4cec-9421-5bcdc1b55121
 *                     shipping_status:
 *                       type: string
 *                       example: PENDING
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error – likely due to foreign key violation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: insert or update on table "payment" violates foreign key constraint "payment_order_id_order_id_fk"
 */
router.post(
  "/v1/:orderId/pay",
  validate(Validation.payOrderSchema),
  Handler.payOrderHandler
);

/**
 * @swagger
 * /api/order/{orderId}/cancel:
 *   post:
 *     summary: Cancel an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the order to cancel
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 179f97bf-3f0d-4449-8146-6e14c4adf7c1
 *                 tenant_id:
 *                   type: string
 *                   example: 47dd6b24-0b23-46b0-a662-776158d089ba
 *                 user_id:
 *                   type: string
 *                   example: a3de2f5c-44a0-4eb6-85de-9b987ca7aa14
 *                 order_date:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-27T06:35:28.127Z
 *                 total_amount:
 *                   type: number
 *                   example: 5
 *                 order_status:
 *                   type: string
 *                   example: CANCELLED
 *                 shipping_provider:
 *                   type: string
 *                   example: JNE
 *                 shipping_code:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 shipping_status:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       401:
 *         description: Unauthorized – Bearer token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order not found
 */
router.post(
  "/v1/:orderId/cancel",
  verifyJWT,
  validate(Validation.cancelOrderSchema),
  Handler.cancelOrderHandler
);

export default router;
