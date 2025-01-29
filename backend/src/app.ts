import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes";
import loggerMiddleware from "./middlewares/loggerMiddleware";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use(cors({
    origin: 'http://localhost:4200',
  }));

app.use("/api", apiRoutes);

export default app;