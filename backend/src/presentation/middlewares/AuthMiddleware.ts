import { Request, Response, NextFunction } from "express";
import { ITokenService } from "../../application/services/ITokenService";
import { HttpStatusCode } from "../enums/httpCodes";

export class AuthMiddleware {
  constructor(private readonly _tokenService: ITokenService) {}

  handle(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (!token) return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Unauthorized" });

    try {
      const payload = this._tokenService.verifyAccessToken(token);
      (req as any).user = payload;
      next();
    } catch {
      return res.status(HttpStatusCode.FORBIDDEN).json({ message: "Invalid or expired token" });
    }
  }
}
