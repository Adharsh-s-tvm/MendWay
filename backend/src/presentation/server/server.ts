import express from 'express';
import customerRoutes from "../routes/customerRoutes.js";
import connectDB from '../../infrastructure/db/mongoClient.js';

export async function createServer() {
    await connectDB();
    const app = express();
    app.use(express.json());
    app.use("/customers", customerRoutes);
    return app;
}