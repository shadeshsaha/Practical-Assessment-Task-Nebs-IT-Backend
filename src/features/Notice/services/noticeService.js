import { ApiError } from "../../../utils/ApiError.js";
import { Notice } from "../models/noticeModel.js";

const createNotice = async (data) => {
  const notice = new Notice(data);
  await notice.save();
  return notice.toObject();
};

const findAllNotices = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    targetType,
    status,
    startDate,
    endDate,
  } = query;

  const filter = {};
  if (search) {
    filter.$text = { $search: search };
  }

  if (targetType) {
    filter.targetType = targetType;
  }

  if (status) {
    filter.status = status;
  }

  if (startDate || endDate) {
    filter.publishDate = {};
    if (startDate) {
      filter.publishDate.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.publishDate.$lte = new Date(endDate);
    }
  }

  const skip = (page - 1) * limit;
  const [notices, total] = await Promise.all([
    Notice.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Notice.countDocuments(filter),
  ]);

  return {
    data: notices,
    page,
    limit,
    total,
  };
};

const findNoticeById = async (id) => {
  const notice = await Notice.findById(id);

  if (!notice) {
    throw ApiError.notFound("Notice not found");
  }

  return notice;
};

const toggleNoticeStatus = async (id) => {
  const notice = await Notice.findById(id);

  if (!notice) {
    throw ApiError.notFound("Notice not found");
  }

  const updateData = {};

  switch (notice.status) {
    case "unpublished":
      updateData.status = "published";
      break;
    case "published":
      updateData.status = "unpublished";
      break;
  }

  if (updateData.status === "published") {
    updateData.publishedAt = new Date();
  }

  if (updateData.status === "unpublished") {
    updateData.publishedAt = null;
  }

  const updatedNotice = await Notice.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedNotice) {
    throw ApiError.notFound("Notice not found");
  }

  return updatedNotice;
};

export const noticeService = {
  createNotice,
  findAllNotices,
  findNoticeById,
  toggleNoticeStatus,
};
