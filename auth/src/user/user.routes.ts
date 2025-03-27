import express from "express";
import { validate } from "../middleware/validate";
import * as Validation from "./validation";
import * as Handler from "./user.handler";

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - full_name
 *               - address
 *               - phone_number
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *                 description: >
 *                   Must contain at least one lowercase letter, one uppercase letter, and one number.
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *               address:
 *                 type: string
 *                 example: 123 Main Street, Springfield
 *               phone_number:
 *                 type: string
 *                 example: +621234567890
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Username or email already exists
 */
router.post(
  "/v2/register",
  validate(Validation.registerSchema),
  Handler.registerHandler
); //v2

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: Example123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: User not found or invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found or Invalid password
 */

router.post(
  "/v1/login",
  validate(Validation.loginSchema),
  Handler.loginHandler
); //v1

/**
 * @swagger
 * /api/auth/verify-token:
 *   post:
 *     summary: Verify user token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Token is valid and user info is returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 573e2fe7-65c9-443e-9951-fe949f0ce08b
 *                     username:
 *                       type: string
 *                       example: example
 *                     email:
 *                       type: string
 *                       example: example@example.com
 *                     full_name:
 *                       type: string
 *                       example: example
 *                     address:
 *                       type: string
 *                       example: example
 *                     phone_number:
 *                       type: string
 *                       example: "1234567890"
 *       403:
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
  "/v1/verify-token",
  validate(Validation.verifyTokenSchema),
  Handler.verifyTokenHandler
); //v1

/**
 * @swagger
 * /api/auth/verify-admin-token:
 *   post:
 *     summary: Verify admin token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Token is valid and admin info is returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 573e2fe7-65c9-443e-9951-fe949f0ce08b
 *                     username:
 *                       type: string
 *                       example: admin
 *                     email:
 *                       type: string
 *                       example: admin@example.com
 *                     full_name:
 *                       type: string
 *                       example: admin
 *                     address:
 *                       type: string
 *                       example: admin
 *                     phone_number:
 *                       type: string
 *                       example: "1234567890"
 *       403:
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
  "/v1/verify-admin-token",
  validate(Validation.verifyAdminTokenSchema),
  Handler.verifyAdminTokenHandler
); //v1

export default router;
