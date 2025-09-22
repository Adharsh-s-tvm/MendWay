export enum UserRole {
  Customer = 'customer',
  Worker = 'worker',
  Admin = 'admin'
}

export enum UserLoginMethod {
  GoogleAuthentication = 'googleauthentication',
  Email = 'email'
}

export class CustomerEntity {
  public readonly id: string;
  public name: string;
  public email: string;
  public phone: string;
  public passwordHash: string;
  public isBlocked: boolean;
  public role: UserRole;
  public loginMethod: UserLoginMethod;
  public lastLogin: Date;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    isBlocked?: boolean;
    role?: UserRole;
    loginMethod: UserLoginMethod;
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone ?? null;
    this.passwordHash = props.passwordHash;
    this.isBlocked = props.isBlocked ?? false;
    this.role = props.role ?? UserRole.Customer;
    this.loginMethod = props.loginMethod;
    const now = new Date();
    this.lastLogin = props.lastLogin ?? now;
    this.createdAt = props.createdAt ?? now;
    this.updatedAt = props.updatedAt ?? now;
  }

  block(): void {
    this.isBlocked = true;
    this.updatedAt = new Date();
  }

  markLogin(): void {
    this.lastLogin = new Date();
    this.updatedAt = new Date();
  }
}


