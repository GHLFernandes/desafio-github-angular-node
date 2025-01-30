import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import apiRoutes from "./routes/apiRoutes";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { setupSwagger } from "./config/swaggerConfig";

dotenv.config();

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use(cors({
    origin: 'http://localhost:4200',
}));

setupSwagger(app);
app.use("/api", apiRoutes);

export default app;