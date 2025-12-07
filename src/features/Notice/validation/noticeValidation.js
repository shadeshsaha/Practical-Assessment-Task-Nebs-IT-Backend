import { z } from "zod";

const targetTypes = [
  "individual",
  "finance",
  "sales-team",
  "web-team",
  "database-team",
  "admin",
  "hr",
  "all",
];

const noticeTypes = [
  "warning-disciplinary",
  "performance-improvement",
  "appreciation-recognition",
  "attendance-leave-issue",
  "payroll-compensation",
  "contract-role-update",
  "advisory-personal-reminder",
];

const attachmentSchema = z.object({
  fileName: z.string("File name is required"),
  fileUrl: z.string("Invalid file URL"),
});

export const createNoticeSchema = z
  .object({
    title: z.string().min(1, "Notice title is required").max(200),
    body: z.string().max(5000).optional(),
    targetType: z.enum(targetTypes, "Target type is required"),
    targetEmployee: z.string().optional(),
    noticeType: z.enum(noticeTypes, "Notice type is required"),
    publishDate: z
      .string()
      .min(1, "Publish date is required")
      .transform((val) => new Date(val)),
    attachments: z.array(attachmentSchema).max(2).optional(),
    status: z.enum(["draft", "published"]).optional(),
  })
  .transform((data) => ({
    ...data,
    targetEmployees: data.targetEmployee ? [data.targetEmployee] : [],
  }));

export const getNoticeSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid notice ID"),
  }),
});

export const getNoticesQuerySchema = z.object({
  query: z.object({
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    search: z.string().optional(),
    targetType: z.enum(targetTypes).optional(),
    employeeId: z.string().optional(),
    status: z.enum(["draft", "published", "unpublished"]).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});
