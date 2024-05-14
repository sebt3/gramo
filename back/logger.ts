import { createLogger, transports, format } from "winston";

export const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine((format.timestamp(), format.json())),
    transports: [new transports.Console()],
});
