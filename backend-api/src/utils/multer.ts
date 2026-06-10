import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { AppError } from "./AppError";

// File filters
const fileFilterImg = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new AppError("Only image files are allowed", 400));
  }

  cb(null, true);
};

const fileFilterPdf = (
  _req: Request, 
  file: Express.Multer.File, 
  cb: FileFilterCallback
) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new AppError("Only PDF files are allowed", 400));
  }

  cb(null, true);
};

// Memory storage for Cloudinary uploads
const memoryStorage = multer.memoryStorage();

// Exports uploaders:
// For projects images (5MB limit each and only images)
export const uploadProjectImage = multer({
  storage: memoryStorage,
  fileFilter: fileFilterImg,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// For users photo (5MB limit)
export const uploadUserImage = multer({
  storage: memoryStorage,
  fileFilter: fileFilterImg,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// For CVs pdfs (10MB limit and only PDFs)
export const uploadUserCV = multer({
  storage: memoryStorage,
  fileFilter: fileFilterPdf,
  limits: { fileSize: 10 * 1024 * 1024 },
});
