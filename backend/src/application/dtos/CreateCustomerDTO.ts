export interface CreateCustomerDTO{
    name:string;
    email:string;
    phone:string;
    passwordHash: string;
    loginMethod: 'googleauthentication' | 'email';
}                           