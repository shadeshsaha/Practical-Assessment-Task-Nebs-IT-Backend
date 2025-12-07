import mongoose from "mongoose";
import { config } from "./index.js";

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbURI);
    // console.info(`MongoDB Connected Successfully: ${conn.connection.host}`);
    console.info(`MongoDB Connected Successfully`);

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
