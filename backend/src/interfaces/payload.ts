import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface RequestPayload extends Request {
  user?: string | JwtPayload;
}

export { RequestPayload };