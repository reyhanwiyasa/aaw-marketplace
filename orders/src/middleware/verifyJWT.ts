import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";

interface JWTUser extends JwtPayload {
  id: string;
  tenant_id: string;
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Verifying JWT...");
    const authHeader = req.headers.authorization;
    console.log(`Authorization Header: ${authHeader}`);

    const token = authHeader?.split("Bearer ")[1];
    console.log("INI TOKEN: ", token);
    if (!token) {
      console.log("No token provided.");
      return res
        .status(401)
        .json(new UnauthenticatedResponse("No token provided").generate());
    }

    console.log(`Token received: ${token}`);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTUser;
    console.log(`Token decoded: ${JSON.stringify(decoded)}`);

    const SERVER_TENANT_ID = process.env.TENANT_ID;
    console.log(`Expected tenant ID: ${SERVER_TENANT_ID}`);
    if (SERVER_TENANT_ID && decoded.tenant_id !== SERVER_TENANT_ID) {
      console.log(`Invalid tenant ID: ${decoded.tenant_id}`);
      return res
        .status(401)
        .json(new UnauthenticatedResponse("Invalid tenant").generate());
    }

    req.body.user = decoded;
    console.log("JWT verified successfully. Proceeding to next middleware...");

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json(new UnauthenticatedResponse("Invalid token").generate());
  }
};
