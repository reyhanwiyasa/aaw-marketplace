import express from "express";
import { validate, verifyJWTTenant } from "../middleware/";
import * as Validation from "./validation";
import * as Handler from "./tenant.handler";

const router = express.Router();

/**
 * @swagger
 * /api/tenant/{tenant_id}:
 *   get:
 *     summary: Get tenant data by ID (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Tenant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenant_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the tenant to retrieve
 *     responses:
 *       200:
 *         description: Tenant data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tenants:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "Strings"
 *                     owner_id:
 *                       type: string
 *                       example: "Strings"
 *                 tenantDetails:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "Strings"
 *                     tenant_id:
 *                       type: string
 *                       example: "Strings"
 *                     name:
 *                       type: string
 *                       example: "Strings"
 *       401:
 *         description: Invalid or missing admin token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       404:
 *         description: Tenant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tenant not found
 */
router.get(
  "/v1/:tenant_id",
  verifyJWTTenant,
  validate(Validation.getTenantSchema),
  Handler.getTenantHandler
); //v1

/**
 * @swagger
 * /api/tenant:
 *   post:
 *     summary: Create a new tenant (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Tenant]
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
 *         description: Tenant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tenants:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "Strings"
 *                     owner_id:
 *                       type: string
 *                       example: "Strings"
 *                 tenantDetails:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "Strings"
 *                     tenant_id:
 *                       type: string
 *                       example: "Strings"
 *                     name:
 *                       type: string
 *                       example: "Strings"
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
  verifyJWTTenant,
  validate(Validation.createTenantSchema),
  Handler.createTenantHandler
); //v1

/**
 * @swagger
 * /api/tenant/{old_tenant_id}:
 *   put:
 *     summary: Edit an existing tenant (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Tenant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: old_tenant_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The current ID of the tenant to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - tenantId
 *               - owner_id
 *               - name
 *             properties:
 *               user:
 *                 type: string
 *                 example: "Strings"
 *               tenantId:
 *                 type: string
 *                 format: uuid
 *                 example: "Strings"
 *               owner_id:
 *                 type: string
 *                 format: uuid
 *                 example: "Strings"
 *               name:
 *                 type: string
 *                 example: "Strings"
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tenant:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "Strings"
 *                     owner_id:
 *                       type: string
 *                       example: "Strings"
 *                 tenantDetails:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "Strings"
 *                     tenant_id:
 *                       type: string
 *                       example: "Strings"
 *                     name:
 *                       type: string
 *                       example: "Strings"
 *       400:
 *         description: Validation failed
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
 *                         example: ["body", "owner_id"]
 *       403:
 *         description: Forbidden – You are not allowed to edit this tenant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not allowed to edit this tenant
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
  "/v1/:old_tenant_id",
  verifyJWTTenant,
  validate(Validation.editTenantSchema),
  Handler.editTenantHandler
); //v1

/**
 * @swagger
 * /api/tenant:
 *   delete:
 *     summary: Delete a tenant (Admin only)
 *     description: Requires a valid Bearer token from an admin account
 *     tags: [Tenant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tenant_id
 *             properties:
 *               tenant_id:
 *                 type: string
 *                 format: uuid
 *                 example: "Strings"
 *     responses:
 *       200:
 *         description: Tenant deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tenants:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "Strings"
 *                     owner_id:
 *                       type: string
 *                       example: "Strings"
 *                 tenantDetails:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "Strings"
 *                     tenant_id:
 *                       type: string
 *                       example: "Strings"
 *                     name:
 *                       type: string
 *                       example: "Strings"
 *       403:
 *         description: Forbidden – You are not allowed to edit this tenant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not allowed to edit this tenant
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
router.delete(
  "/v1",
  verifyJWTTenant,
  validate(Validation.deleteTenantSchema),
  Handler.deleteTenantHandler
); //v1

export default router;
