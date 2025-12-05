import mongoose from "mongoose";
import { NoticeStatus, NoticeType, TargetType } from "../types/noticeTypes.js";

const attachmentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    body: {
      type: String,
      trim: true,
      maxlength: [5000, "Notice body cannot exceed 5000 characters"],
    },
    targetType: {
      type: String,
      enum: {
        values: TargetType,
        message: "{VALUE} is not a valid target type",
      },
      required: [true, "Target type is required"],
    },
    targetEmployees: [
      {
        type: String,
        trim: true,
      },
    ],
    noticeType: {
      type: String,
      enum: {
        values: NoticeType,
        message: "{VALUE} is not a valid notice type",
      },
      required: [true, "Notice type is required"],
    },
    publishDate: {
      type: Date,
      required: [true, "Publish date is required"],
    },
    attachments: [attachmentSchema],
    status: {
      type: String,
      enum: NoticeStatus,
      default: "draft",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

noticeSchema.index({ title: "text", body: "text" });
noticeSchema.index({ status: 1 });
noticeSchema.index({ targetType: 1 });
noticeSchema.index({ publishDate: -1 });

export const Notice = mongoose.model("Notice", noticeSchema);

// import mongoose from "mongoose";

// const noticeSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//       maxlength: [200, "Title cannot exceed 200 characters"],
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       trim: true,
//       maxlength: [1000, "Description cannot exceed 1000 characters"],
//     },
//     noticeType: {
//       type: String,
//       required: [true, "Notice type is required"],
//       enum: {
//         values: ["general", "urgent", "event", "announcement"],
//         message: "Notice type must be general, urgent, event, or announcement",
//       },
//     },
//     status: {
//       type: String,
//       enum: ["draft", "published"],
//       default: "draft",
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Notice", noticeSchema);
