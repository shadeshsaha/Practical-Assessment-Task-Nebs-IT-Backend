import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),

  // Database
  mongodbURI: process.env.MONGODB_URI,

  // CORS
  corsOrigin: process.env.CORS_ORIGIN,
};

// Validate required environment variables
const requiredEnv = ["MONGODB_URI", "CORS_ORIGIN"];

export const validate = () => {
  const missingVars = requiredEnv.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};
