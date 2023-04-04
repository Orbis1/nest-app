import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as moment from 'moment-timezone';

const { KEEP_LOGS_FOR, APP_NAME } = process.env;
const appName = APP_NAME || 'NoName';

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: `./logs/${appName}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  maxFiles: KEEP_LOGS_FOR || '3d',
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz('Europe/Moscow').format(),
    }),
    winston.format.json(),
  ),
});

const nestLikeTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike(appName, {
      colors: true,
      prettyPrint: true,
    }),
  ),
});

export const logger = WinstonModule.createLogger({
  transports: [nestLikeTransport, fileRotateTransport],
});
