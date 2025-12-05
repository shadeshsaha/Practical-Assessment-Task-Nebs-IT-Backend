export const TargetType = [
  "individual",
  "finance",
  "sales-team",
  "web-team",
  "database-team",
  "admin",
  "hr",
  "all",
];

export const NoticeType = [
  "warning-disciplinary",
  "performance-improvement",
  "appreciation-recognition",
  "attendance-leave-issue",
  "payroll-compensation",
  "contract-role-update",
  "advisory-personal-reminder",
];

export const NoticeStatus = ["draft", "published"];

export const IAttachment = {
  fileName: "",
  fileUrl: "",
};

export const INotice = {
  title: "",
  body: "",
  targetType: "",
  targetEmployees: [],
  noticeType: "",
  publishDate: new Date(),
  attachments: [],
  status: "",
  priority: "",
  publishedAt: new Date(),
};

export const CreateNoticeDto = {
  title: "",
  body: "",
  targetType: "",
  targetEmployees: [],
  noticeType: "",
  publishDate: "",
  attachments: [],
  status: "",
  priority: "",
};

export const NoticeQueryParams = {
  page: 1,
  limit: 10,
  search: "",
  targetType: "",
  status: "",
  startDate: "",
  endDate: "",
};
