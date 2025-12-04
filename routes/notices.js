import express from "express";
import { body } from "express-validator";
import {
  createNotice,
  getNoticeById,
  getNotices,
  updateNoticeStatus,
} from "../controllers/noticeController.js";

const router = express.Router();

// Validation middleware
const validateNoticeCreate = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title must be less than 200 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 1000 })
    .withMessage("Description must be less than 1000 characters"),
  body("noticeType")
    .trim()
    .notEmpty()
    .withMessage("Notice type is required")
    .isIn(["general", "urgent", "event", "announcement"])
    .withMessage("Invalid notice type"),
];

// Routes
router.post("/", validateNoticeCreate, createNotice);
router.get("/", getNotices);
router.patch("/:id/status", updateNoticeStatus);
router.get("/:id", getNoticeById);

export default router;
