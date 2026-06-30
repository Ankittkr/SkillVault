import fs from "fs";
import path from "path";
import multer from "multer";
import { ApiError } from "../../utils/ApiError.js";

const uploadDir = "./public";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const videoFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
        cb(null, true);
    } else {
        cb(new Error("Only video files are allowed"), false);
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: imageFileFilter,
});

export const uploadVideo = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: videoFileFilter,
});

export const uploadVideoMiddleware = (req, res, next) => {
    uploadVideo.single("videoUrl")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return next(new ApiError(400, "Video file is too large. Maximum allowed size is 100MB."));
            }
            return next(new ApiError(400, err.message));
        }
        if (err) {
            return next(new ApiError(400, err.message));
        }
        next();
    });
};
