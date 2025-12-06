import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { noticeService } from "../services/noticeService.js";

// create a notice [POST /api/v1/notices]
const createNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.createNotice(req.body);
  ApiResponse.createdNotice(res, notice, "Notice created successfully");
});

// get all notices [GET /api/v1/notices]
const getAllNotices = asyncHandler(async (req, res) => {
  const query = req.query;
  const result = await noticeService.findAllNotices(query);

  ApiResponse.paginatedNotice(
    res,
    result.data,
    result.page,
    result.limit,
    result.total,
    result.activeCount,
    result.draftCount,
    "Notices retrieved successfully"
  );
});

// get a single notice [GET /api/v1/notices/:id]
const getNoticeById = asyncHandler(async (req, res) => {
  const notice = await noticeService.findNoticeById(req.params.id);
  ApiResponse.success(res, notice, "Notice retrieved successfully");
});

// notice status [PATCH /api/v1/notices/:id/toggle-status]
const toggleNoticeStatus = asyncHandler(async (req, res) => {
  const notice = await noticeService.toggleNoticeStatus(req.params.id);

  const message =
    notice.status === "published" ? "Notice Published" : "Notice Unpublished";

  ApiResponse.success(res, notice, message);
});

export const noticeController = {
  createNotice,
  getAllNotices,
  getNoticeById,
  toggleNoticeStatus,
};
