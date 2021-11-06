import 'winston-daily-rotate-file'

import _winston from 'winston'
import { loggerDir } from './config.js'

const { createLogger, format, transports, addColors } = _winston

addColors({
  done: 'green',
  scriptrun: 'bold green',
  scriptdone: 'bold green'
})
const logger = createLogger({
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    apierror: 6,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
    done: 6,
    scriptrun: 5,
    scriptdone: 5
  },
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.errors({
      stack: true
    }),
    format.splat(),
    format.json(),
    format.ms()
  ),
  defaultMeta: { service: 'ainalbot' },
  transports: [
    new transports.DailyRotateFile({
      dirname: loggerDir,
      frequency: '24h',
      filename: process.env.NODE_ENV === 'production' ? 'prod-%DATE%.log' : '%DATE%.log',
      maxSize: '1mb',
      maxFiles: '15d',
      utc: true,
      createSymlink: true,
      symlinkName: '_current.log'
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${loggerDir}/exceptions.log` })
  ]
})

export default logger