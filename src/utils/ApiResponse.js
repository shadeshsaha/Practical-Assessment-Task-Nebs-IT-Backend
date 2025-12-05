export const IApiResponse = {
  success: true,
  message: "",
  data: null,
  meta: {},
};

export const ApiResponse = {
  success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  created(res, data, message = "Created successfully") {
    return ApiResponse.success(res, data, message, 201);
  },

  paginated(res, data, page, limit, total, message = "Success") {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta: {
        page,
        limit,
        total,
      },
    });
  },
};
