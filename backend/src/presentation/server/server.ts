import express from 'express';
import customerRoutes from "../http/routes/customerRoutes.js";
import connectDB from '../../infrastructure/db/mongo/mongoClient.js';

export async function createServer() {
    await connectDB();
    const app = express();
    app.use(express.json());
    app.use("/customers", customerRoutes);
    return app;
}