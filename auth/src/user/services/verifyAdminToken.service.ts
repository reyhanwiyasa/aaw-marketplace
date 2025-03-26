import jwt, { JwtPayload } from "jsonwebtoken";
import {
  InternalServerErrorResponse,
  UnauthorizedResponse,
} from "../../commons/patterns";
import { getUserById } from "../dao/getUserById.dao";

export const verifyAdminTokenService = async (token: string) => {
  console.log("Received token for verification:", token); // Log the token received

  if (!token) {
    console.log("No token provided, returning 400.");
    return { error: "Token is required", status: 400 };
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET as string
    ) as JwtPayload;
    console.log("Decoded payload:", payload); // Log the decoded JWT payload

    const { id, tenant_id } = payload;
    const SERVER_TENANT_ID = process.env.ADMIN_TENANT_ID;
    console.log("Expected SERVER_TENANT_ID:", SERVER_TENANT_ID); // Log the expected tenant ID

    if (!SERVER_TENANT_ID) {
      console.log("SERVER_TENANT_ID is missing in the environment.");
      return {
        error: "Server tenant ID is missing",
        status: 500,
        response: new InternalServerErrorResponse(
          "Server tenant ID is missing"
        ).generate(),
      };
    }
    if (tenant_id !== SERVER_TENANT_ID) {
      console.log(
        `Tenant ID in token (${tenant_id}) does not match SERVER_TENANT_ID (${SERVER_TENANT_ID}).`
      );
      return {
        error: "Invalid token",
        status: 401,
        response: new UnauthorizedResponse("Invalid token").generate(),
      };
    }

    const user = await getUserById(id, SERVER_TENANT_ID);
    if (!user) {
      console.log("No user found with the ID provided in the token.");
      return {
        error: "Invalid token",
        status: 401,
        response: new UnauthorizedResponse("Invalid token").generate(),
      };
    }

    console.log("User verified successfully:", user);
    return { data: { user }, status: 200 };
  } catch (error) {
    console.error("Error verifying token:", error);
    return {
      error: "Invalid token",
      status: 401,
      response: new UnauthorizedResponse("Invalid token").generate(),
    };
  }
};
