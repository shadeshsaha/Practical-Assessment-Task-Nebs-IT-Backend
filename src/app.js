import cors from "cors";
import express from "express";
import helmet from "helmet";
// import { config } from "./config/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { ApiRoutes } from "./routes.js";

const app = express();

app.use(helmet());
// app.use(
//   cors({
//     origin: config.corsOrigin,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", async (req, res) => {
  res.send("Welcome to Nebs-IT Task Server!!");
});

// API Routes
app.use("/api/v1", ApiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
