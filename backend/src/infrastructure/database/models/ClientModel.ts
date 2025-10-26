import mongoose, { Schema, Document, Model } from "mongoose";
import { Client } from "../../../domain/entities/Client";

// Extend Document for mongoose
export interface ClientDocument extends Client, Document { }

const ClientSchema: Schema = new Schema(
  {
    clientId: { type: String, required: true, unique: true },
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


export const ClientModel: Model<ClientDocument> = mongoose.model<ClientDocument>(
  "Client",
  ClientSchema
);
