import mongoose, { Schema, Document } from "mongoose";
import { UserRole, UserLoginMethod } from "../../../../domain/entities/Customer.js";

export interface CustomerDoc extends Document {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    isBlocked: boolean;
    role: UserRole;
    loginMethod: UserLoginMethod;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema = new Schema<CustomerDoc>({
    id: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    passwordHash: String,
    isBlocked: { type: Boolean, default: false },
    role: {type: String, enum: Object.values(UserRole)},
    loginMethod:{type:String, enum:Object.values(UserLoginMethod)},
    lastLogin:Date,
    createdAt:Date,
    updatedAt:Date
})

export const CustomerModel = mongoose.model<CustomerDoc>("Customer", CustomerSchema)