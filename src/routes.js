import { Router } from "express";
import { NoticeRoutes } from "./features/Notice/routes/noticeRoutes.js";

const router = Router();

// API Routes
router.use("/notices", NoticeRoutes);

export { router as ApiRoutes };
