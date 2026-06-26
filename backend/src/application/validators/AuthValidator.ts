import { LoginUserDTO, UserRequestDTO } from "../dtos/user/UserDTO";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AuthValidator {
  static validatePassword(password: string): void {
    if (!password || password.length < 8) {
      throw new ValidationError(
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character"
      );
    }

    if (!this._isStrongPassword(password)) {
      throw new ValidationError(
        "Password must include uppercase, lowercase, number, and special character"
      );
    }
  }

  static validateRegistration(data: UserRequestDTO): void {
    if (!data.user_name || data.user_name.trim().length < 2) {
      throw new ValidationError("Name must be at least 2 characters");
    }

    if (!this._isValidEmail(data.email_address)) {
      throw new ValidationError("Invalid email format");
    }

    this.validatePassword(data.password);

    if (data.phone_number && !this._isValidPhone(data.phone_number)) {
      throw new ValidationError(
        "Phone number must be a valid 10-15 digit number and cannot consist of all zeroes"
      );
    }
  }

  static validateLogin(data: LoginUserDTO): void {
    if (!this._isValidEmail(data.email_address)) {
      throw new ValidationError("Invalid email format");
    }

    if (!data.password) {
      throw new ValidationError("Password is required");
    }
  }

  /** Email validation */
  private static _isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /** Strong password validation */
  private static _isStrongPassword(password: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    return strongPasswordRegex.test(password);
  }

  /** Phone validation */
  private static _isValidPhone(phone: number | string): boolean {
    const phoneStr = String(phone).trim();
    if (!/^\d{10,15}$/.test(phoneStr)) {
      return false;
    }
    if (/^0+$/.test(phoneStr)) {
      return false;
    }
    return true;
  }
}
