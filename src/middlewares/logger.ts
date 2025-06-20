import winston from "winston";
import env from "../configs/env";

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.colorize(), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.json()),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    ],
});

if (env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({ format: winston.format.simple(), consoleWarnLevels: ['warn', 'error'] }));
    winston.addColors({
        warn: 'yellow',
        error: 'red',
    });
}

export default logger;