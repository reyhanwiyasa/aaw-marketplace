import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";

export const verifyJWTProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Verifying JWT in Product Service...");
    const authHeader = req.headers.authorization;
    console.log("Authorization header received:", authHeader);

    const token = authHeader?.split("Bearer ")[1];
    if (!token) {
      console.log("No token provided in Authorization header.");
      return res.status(401).send({ message: "Invalid token" });
    }
    console.log("Token extracted:", token);

    // Call verifyAdminTokenService from the auth service
    console.log("Making request to verify admin token...");
    const authResponse = await axios.post(
      `${process.env.AUTH_MS_URL}/verify-admin-token`,
      { token }
    );

    console.log("Response from auth service:", authResponse.data);
    if (authResponse.status !== 200) {
      console.log("Authentication failed with status:", authResponse.status);
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = authResponse.data.user;
    console.log("User details retrieved:", user);

    const SERVER_TENANT_ID = process.env.TENANT_ID;
    console.log("Server Tenant ID from environment:", SERVER_TENANT_ID);
    if (!SERVER_TENANT_ID) {
      console.log("No Server Tenant ID found in environment.");
      return res.status(500).send({ message: "Server Tenant ID not found" });
    }

    // Call getTenantService from the auth service
    console.log("Making request to get tenant details...");
    const tenantResponse = await axios.get(
      `${process.env.TENANT_MS_URL}/${SERVER_TENANT_ID}`
    );
    console.log("Response from tenant service:", tenantResponse.data);
    if (tenantResponse.status !== 200 || !tenantResponse.data) {
      console.log(
        "Failed to retrieve tenant data with status:",
        tenantResponse.status
      );
      return res.status(500).send({ message: "Server Tenant not found" });
    }

    const tenant = tenantResponse.data;
    console.log("Tenant details retrieved:", tenant);

    // Check for tenant ownership
    console.log("Checking tenant ownership...");
    if (user.id !== tenant.tenants.owner_id) {
      console.log("ini user.id: ", user.id);
      console.log("ini owner.id: ", tenant.owner_id);
      console.log("User ID does not match tenant owner ID.");
      return res.status(401).send({ message: "Invalid token" });
    }

    console.log("Tenant ownership verified.");
    req.body.user = user;
    next();
  } catch (error) {
    console.error("Error in verifyJWTProduct:", error);
    return res
      .status(401)
      .json(new UnauthenticatedResponse("Invalid token").generate());
  }
};
