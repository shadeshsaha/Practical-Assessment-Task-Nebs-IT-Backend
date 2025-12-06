import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { config, validate } from "./config/index.js";

const nebsITServer = async () => {
  try {
    // Validate environment variables
    validate();

    // Connect to database
    await connectDatabase();

    const server = app.listen(config.port, () => {
      console.info(`Server running on Port: ${config.port}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Rejection:", reason.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

nebsITServer();
