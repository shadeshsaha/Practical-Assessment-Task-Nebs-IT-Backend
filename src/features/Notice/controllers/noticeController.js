import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { noticeService } from "../services/noticeService.js";

// create a notice
const createNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.createNotice(req.body);
  ApiResponse.created(res, notice, "Notice created successfully");
});

// get all notices
const getAllNotices = asyncHandler(async (req, res) => {
  const query = req.query;
  const result = await noticeService.findAllNotices(query);

  ApiResponse.paginated(
    res,
    result.data,
    result.page,
    result.limit,
    result.total,
    "Notices retrieved successfully"
  );
});

// get a single notice
const getNoticeById = asyncHandler(async (req, res) => {
  const notice = await noticeService.findNoticeById(req.params.id);
  ApiResponse.success(res, notice, "Notice retrieved successfully");
});

// notice status
const toggleNoticeStatus = asyncHandler(async (req, res) => {
  const notice = await noticeService.toggleNoticeStatus(req.params.id);

  const message =
    notice.status === "published"
      ? "Notice published successfully"
      : "Notice unpublished successfully";

  ApiResponse.success(res, notice, message);
});

export const noticeController = {
  createNotice,
  getAllNotices,
  getNoticeById,
  toggleNoticeStatus,
};
