import { Request, Response } from "express";
import { HttpStatusCode } from "../enums/httpCodes";
import { IRegisterCustomerUseCase } from "../../application/interfaces/IRegisterCustomerUseCase";
import { ILoginCustomerUseCase } from "../../application/interfaces/ILoginCustomerUseCase";
import { IGetCurrentUserUseCase } from "../../application/interfaces/IGetCurrentUserUseCase";
import { ITokenService } from "../../application/services/ITokenService";

export class CustomerController {
  constructor(
    private readonly _registerCustomer: IRegisterCustomerUseCase,
    private readonly _loginCustomer: ILoginCustomerUseCase,
    private readonly _getCurrentUser: IGetCurrentUserUseCase,
    private readonly _tokenService: ITokenService
  ) { }

  //  REGISTER
  async register(req: Request, res: Response) {
    try {
      const user = await this._registerCustomer.execute(req.body);
      res.status(HttpStatusCode.CREATED).json(user);
    } catch (error: any) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
    }
  }

  //  LOGIN — sets HttpOnly cookies
  async login(req: Request, res: Response) {
    try {
      const result = await this._loginCustomer.execute(req.body);
      console.log(result);
      const { accessToken, refreshToken, user } = result;

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000, // 15 mins
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(HttpStatusCode.OK)
        .json({ user });
    } catch (error: any) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: error.message });
    }
  }

  // //  ME — returns current user info
  // async me(req: Request, res: Response) {
  //   try {
  //     // const token = req.cookies.accessToken;
  //     // if (!token) {
  //     //   return res
  //     //     .status(HttpStatusCode.UNAUTHORIZED)
  //     //     .json({ message: "No token provided" });
  //     // }

  //     // const decoded = jwt.verify(
  //     //   token,
  //     //   process.env.ACCESS_TOKEN_SECRET as string
  //     // ) as any;

  //     const decoded = this._tokenService.verifyAccessToken(token) as any;
  //     // Fetch user details through use case
  //     const user = await this._getCurrentUser.execute(decoded.id);
  //     res.status(HttpStatusCode.OK).json({ user });
  //   } catch (error: any) {
  //     res
  //       .status(HttpStatusCode.FORBIDDEN)
  //       .json({ message: "Invalid or expired token" });
  //   }
  // }

  async me(req: Request, res: Response) {
  try {
    // ✅ Now req.user is properly typed!
    if (!req.user) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const user = await this._getCurrentUser.execute(req.user.id);
    res.status(HttpStatusCode.OK).json({ user });
  } catch (error: any) {
    res
      .status(HttpStatusCode.FORBIDDEN)
      .json({ message: "Failed to fetch user" });
  }
}


  //  REFRESH — issue a new access token if refresh valid
  async refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "No refresh token provided" });
    }

    // Use the service you created!
    const decoded = this._tokenService.verifyRefreshToken(refreshToken) as any;
    const newAccessToken = this._tokenService.generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(HttpStatusCode.OK).json({ message: "Token refreshed" });
  } catch (error: any) {
    res
      .status(HttpStatusCode.FORBIDDEN)
      .json({ message: "Invalid refresh token" });
  }
}

  //  LOGOUT — clears cookies
  async logout(req: Request, res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(HttpStatusCode.OK).json({ message: "Logged out successfully" });
  }
}
