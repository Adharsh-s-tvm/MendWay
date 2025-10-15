import  jwt  from "jsonwebtoken";
import { ITokenService } from "../../application/services/ITokenService";

export class JwtTokenService implements ITokenService {
    constructor(
        private readonly _accessSecret: string,
        private readonly _refreshSecret: string,
    ) { }

    generateAccessToken(payload: object): string {
        return jwt.sign(payload, this._accessSecret, { expiresIn: "15m" });
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, this._refreshSecret, { expiresIn: "7d" });
    }

    verifyAccessToken(token: string) {
        return jwt.verify(token, this._accessSecret);
    }

    verifyRefreshToken(token: string): any {
        return jwt.verify(token, this._refreshSecret)
    }
}