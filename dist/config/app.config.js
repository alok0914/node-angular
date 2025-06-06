"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = exports.serverConfig = exports.corsConfig = exports.uploadConfig = exports.cloudinaryConfig = exports.jwtConfig = exports.dbConfig = exports.envConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
// Configuration schema validation
const configSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.coerce.number().default(5000),
    MONGO_URI: zod_1.z.string().min(1),
    JWT_SECRET: zod_1.z.string().min(32),
    JWT_EXPIRE: zod_1.z.string().default("1d"),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().min(1),
    CLOUDINARY_API_KEY: zod_1.z.string().min(1),
    CLOUDINARY_API_SECRET: zod_1.z.string().min(1),
    UPLOAD_LIMIT: zod_1.z.coerce.number().default(5), // Max number of images
    FILE_SIZE_LIMIT: zod_1.z.coerce.number().default(5 * 1024 * 1024), // 5MB
    LOG_LEVEL: zod_1.z.enum(["error", "warn", "info", "debug"]).default("info"),
    CORS_ORIGIN: zod_1.z.string().default("*"),
});
// Initialize config
const config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    UPLOAD_LIMIT: process.env.UPLOAD_LIMIT,
    FILE_SIZE_LIMIT: process.env.FILE_SIZE_LIMIT,
    LOG_LEVEL: process.env.LOG_LEVEL,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
};
// Validate configuration
const parsedConfig = configSchema.safeParse(config);
if (!parsedConfig.success) {
    console.error("❌ Invalid environment variables:", parsedConfig.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
}
// Export validated config
exports.envConfig = parsedConfig.data;
// Database configuration
exports.dbConfig = {
    uri: exports.envConfig.MONGO_URI,
    options: {
        autoIndex: exports.envConfig.NODE_ENV === "development", // Auto create indexes in dev
        connectTimeoutMS: 10000, // 10 seconds
        socketTimeoutMS: 45000, // 45 seconds
    },
};
// JWT configuration
exports.jwtConfig = {
    secret: exports.envConfig.JWT_SECRET,
    expiresIn: exports.envConfig.JWT_EXPIRE,
};
// Cloudinary configuration
exports.cloudinaryConfig = {
    cloudName: exports.envConfig.CLOUDINARY_CLOUD_NAME,
    apiKey: exports.envConfig.CLOUDINARY_API_KEY,
    apiSecret: exports.envConfig.CLOUDINARY_API_SECRET,
    folder: "products",
};
// File upload configuration
exports.uploadConfig = {
    limit: exports.envConfig.UPLOAD_LIMIT,
    fileSize: exports.envConfig.FILE_SIZE_LIMIT,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
};
// CORS configuration
exports.corsConfig = {
    origin: exports.envConfig.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
};
// Server configuration
exports.serverConfig = {
    env: exports.envConfig.NODE_ENV,
    port: exports.envConfig.PORT,
    isProduction: exports.envConfig.NODE_ENV === "production",
    isDevelopment: exports.envConfig.NODE_ENV === "development",
    isTest: exports.envConfig.NODE_ENV === "test",
};
// Logger configuration
exports.loggerConfig = {
    level: exports.envConfig.LOG_LEVEL,
    file: {
        filename: "logs/application-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
    },
};
