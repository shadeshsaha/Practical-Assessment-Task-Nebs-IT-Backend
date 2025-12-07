import { Router } from "express";
import { validateMiddleware } from "../../../middleware/validateMiddleware.js";
import { noticeController } from "../controllers/noticeController.js";
import {
  createNoticeSchema,
  getNoticeSchema,
  getNoticesQuerySchema,
} from "../validation/noticeValidation.js";

const router = Router();

router.post(
  "/",
  validateMiddleware(createNoticeSchema),
  noticeController.createNotice
);
router.get(
  "/",
  validateMiddleware(getNoticesQuerySchema),
  noticeController.getAllNotices
);
router.get(
  "/:id",
  validateMiddleware(getNoticeSchema),
  noticeController.getNoticeById
);
router.patch(
  "/:id/toggle-status",
  validateMiddleware(getNoticeSchema),
  noticeController.toggleNoticeStatus
);

export { router as NoticeRoutes };
