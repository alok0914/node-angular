"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const app_config_1 = require("../config/app.config");
const { combine, timestamp, printf, colorize, align } = winston_1.default.format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: app_config_1.loggerConfig.level,
    format: combine(timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), logFormat),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: app_config_1.loggerConfig.file.filename,
            datePattern: app_config_1.loggerConfig.file.datePattern,
            zippedArchive: app_config_1.loggerConfig.file.zippedArchive,
            maxSize: app_config_1.loggerConfig.file.maxSize,
            maxFiles: app_config_1.loggerConfig.file.maxFiles,
        }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: combine(colorize(), align(), logFormat),
    }));
}
exports.default = logger;
