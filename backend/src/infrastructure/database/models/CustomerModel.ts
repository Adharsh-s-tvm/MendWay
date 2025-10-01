import mongoose, { Schema, Document, Model } from "mongoose";
import { Customer } from "../../../domain/entities/Customer";

// Extend Document for mongoose
export interface CustomerDocument extends Customer, Document {}

const CustomerSchema: Schema = new Schema(
  {
    customerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    passwordhash: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    profilePictureUrl: { type: String, default: "" },
    role: { type: String, required: true }, // from Role enum
    lastLoginAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create the model
export const CustomerModel: Model<CustomerDocument> = mongoose.model<CustomerDocument>(
  "Customer",
  CustomerSchema
);
