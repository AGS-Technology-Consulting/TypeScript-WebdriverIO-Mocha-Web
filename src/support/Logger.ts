import winston from 'winston';
import * as path from 'path';

const logDir = path.join(__dirname, '../../logs');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
      : `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5
    })
  ],
  exitOnError: false
});

export class Logger {
  static info(message: string): void {
    logger.info(message);
  }

  static error(message: string, error?: Error): void {
    if (error) {
      logger.error(message, { error: error.message, stack: error.stack });
    } else {
      logger.error(message);
    }
  }

  static warn(message: string): void {
    logger.warn(message);
  }

  static debug(message: string): void {
    logger.debug(message);
  }

  static step(stepDescription: string): void {
    logger.info(`STEP: ${stepDescription}`);
  }

  static test(testName: string, status: 'STARTED' | 'PASSED' | 'FAILED'): void {
    const statusSymbol = status === 'PASSED' ? '✓' : status === 'FAILED' ? '✗' : '▶';
    logger.info(`${statusSymbol} TEST ${status}: ${testName}`);
  }

  static suite(suiteName: string, status: 'STARTED' | 'COMPLETED'): void {
    logger.info(`========== SUITE ${status}: ${suiteName} ==========`);
  }
}

export default Logger;
