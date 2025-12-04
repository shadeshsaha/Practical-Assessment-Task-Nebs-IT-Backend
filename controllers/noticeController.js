import { validationResult } from "express-validator";
import Notice from "../models/Notice.js";

// create a notice
export const createNotice = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const notice = new Notice(req.body);
    await notice.save();

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// get all notices
export const getNotices = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status = "all", search = "" } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Build filter
    let filter = {};
    if (status !== "all") filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const notices = await Notice.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();

    const total = await Notice.countDocuments(filter);

    res.json({
      success: true,
      notices,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

// update a notice status
export const updateNoticeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["draft", "published"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Status must be draft or published",
      });
    }

    const notice = await Notice.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        error: "Notice not found",
      });
    }

    res.json({
      success: true,
      message: "Notice status updated successfully",
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// get a single notice
export const getNoticeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        error: "Notice not found",
      });
    }

    res.json({
      success: true,
      notice,
    });
  } catch (error) {
    next(error);
  }
};
