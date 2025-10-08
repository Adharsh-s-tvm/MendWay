import  jwt  from "jsonwebtoken";
import { ITokenService } from "../../application/services/ITokenService";

export class JwtTokenService implements ITokenService {
    constructor(
        private readonly accessSecret: string,
        private readonly refreshSecret: string,
    ) { }

    generateAccessToken(payload: object): string {
        return jwt.sign(payload, this.accessSecret, { expiresIn: "15m" });
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
    }

    verifyAccessToken(token: string) {
        return jwt.verify(token, this.accessSecret);
    }

    verifyRefreshToken(token: string): any {
        return jwt.verify(token, this.refreshSecret)
    }
}