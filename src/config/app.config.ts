import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
// Configuration schema validation
const configSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5000),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRE: z.string().default("1d"),
  UPLOAD_LIMIT: z.coerce.number().default(5), // Max number of images
  FILE_SIZE_LIMIT: z.coerce.number().default(5 * 1024 * 1024), // 5MB
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  CORS_ORIGIN: z.string().default("*"),
});

// Initialize config
const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  UPLOAD_LIMIT: process.env.UPLOAD_LIMIT,
  FILE_SIZE_LIMIT: process.env.FILE_SIZE_LIMIT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};

// Validate configuration
const parsedConfig = configSchema.safeParse(config);

if (!parsedConfig.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedConfig.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

// Export validated config
export const envConfig = parsedConfig.data;

// Database configuration
export const dbConfig = {
  uri: envConfig.MONGO_URI,
  options: {
    autoIndex: envConfig.NODE_ENV === "development", // Auto create indexes in dev
    connectTimeoutMS: 10000, // 10 seconds
    socketTimeoutMS: 45000, // 45 seconds
  },
};

// JWT configuration
export const jwtConfig = {
  secret: envConfig.JWT_SECRET,
  expiresIn: envConfig.JWT_EXPIRE,
};

// File upload configuration
export const uploadConfig = {
  limit: envConfig.UPLOAD_LIMIT,
  fileSize: envConfig.FILE_SIZE_LIMIT,
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
};

// CORS configuration
export const corsConfig = {
  origin: envConfig.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
};

// Server configuration
export const serverConfig = {
  env: envConfig.NODE_ENV,
  port: envConfig.PORT,
  isProduction: envConfig.NODE_ENV === "production",
  isDevelopment: envConfig.NODE_ENV === "development",
  isTest: envConfig.NODE_ENV === "test",
};

// Logger configuration
export const loggerConfig = {
  level: envConfig.LOG_LEVEL,
  file: {
    filename: "logs/application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  },
};
