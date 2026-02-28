import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";

// Function to create storage dynamically
const createStorage = (folder: string) => {

  const uploadPath = path.resolve(`uploads/${folder}`);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (
      _req: Request,
      _file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, uploadPath);
    },

    filename: (
      _req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      const uniqueName =
        Date.now() + "-" + Math.round(Math.random() * 1e9);

      const extension = path.extname(file.originalname);

      cb(null, uniqueName + extension);
    },
  });
};

// File filters
const fileFilterImg = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }

  cb(null, true);
};

const fileFilterPdf = (
  _req: Request, 
  file: Express.Multer.File, 
  cb: FileFilterCallback
) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"));
  }

  cb(null, true);
};

// Exports uploaders:
// For projects images (5MB limit each and only images)
export const uploadProjectImage = multer({
  storage: createStorage("projects"),
  fileFilter: fileFilterImg,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// For users photo (5MB limit)
export const uploadUserImage = multer({
  storage: createStorage("users"),
  fileFilter: fileFilterImg,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// For CVs pdfs (10MB limit and only PDFs)
export const uploadUserCV = multer({
  storage: createStorage("cv"),
  fileFilter: fileFilterPdf,
  limits: { fileSize: 10 * 1024 * 1024 },
});