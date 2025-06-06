import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { loggerConfig } from '../config/app.config';


const { combine, timestamp, printf, colorize, align } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: loggerConfig.level,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    new DailyRotateFile({
      filename: loggerConfig.file.filename,
      datePattern: loggerConfig.file.datePattern,
      zippedArchive: loggerConfig.file.zippedArchive,
      maxSize: loggerConfig.file.maxSize,
      maxFiles: loggerConfig.file.maxFiles,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), align(), logFormat),
    })
  );
}

export default logger;