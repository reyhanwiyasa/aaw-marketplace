import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";

export const verifyJWTTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Accessing verifyJWTTenant middleware");
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);
    const token = authHeader?.split("Bearer ")[1];
    if (!token) {
      console.log("No token provided, unauthorized access attempt.");
      return res.status(401).send({ message: "invalid token" });
    }

    console.log("Token extracted, making request to auth service:", token);
    // Call the verifyAdminTokenService from the auth service
    const authResponse = await axios.post(
      `${process.env.AUTH_MS_URL}/verify-admin-token`,
      { token }
    );
    const user = authResponse.data.user;
    console.log("Response from auth service:", user);

    if (authResponse.status !== 200) {
      console.log("Auth service responded with status:", authResponse.status);
      return res.status(401).send({ message: "invalid token" });
    }

    if (!user) {
      console.log("No user data found in response.");
      return res
        .status(401)
        .json(
          new UnauthenticatedResponse(
            "invalid token di tenant/verifyJWTTenant"
          ).generate()
        );
    }

    console.log("User verified successfully:", user);
    req.body.user = user;
    next();
  } catch (error) {
    console.error("Error verifying admin token:", error);
    return res
      .status(401)
      .json(
        new UnauthenticatedResponse(
          "invalid token di tenant/verifyJWTTenant"
        ).generate()
      );
  }
};
