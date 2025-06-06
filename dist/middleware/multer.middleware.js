"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const app_config_1 = require("../config/app.config");
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (app_config_1.uploadConfig.allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: app_config_1.uploadConfig.fileSize,
        files: app_config_1.uploadConfig.limit,
    },
});
