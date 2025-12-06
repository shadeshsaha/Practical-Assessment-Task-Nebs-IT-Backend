import { Router } from "express";
import { NoticeRoutes } from "./features/Notice/routes/noticeRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
router.use("/notices", NoticeRoutes);

export { router as ApiRoutes };
