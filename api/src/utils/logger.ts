/* eslint-disable @typescript-eslint/explicit-function-return-type */
import winston from 'winston'

const { format } = winston
const { colorize, splat, combine, simple } = format

const isTest = process.env.ENV === 'test'

export const logger = winston.createLogger({
  format: combine(colorize(), splat(), simple()),
  silent: isTest,
  transports: [new winston.transports.Console()]
})
