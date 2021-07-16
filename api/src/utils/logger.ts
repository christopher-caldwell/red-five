/* eslint-disable @typescript-eslint/explicit-function-return-type */
import winston from 'winston'

const { format } = winston
const { colorize, splat, simple, combine, json } = format

const isTest = process.env.ENV === 'test'

export const conditionalColorize = () => {
  return process.env.STAGE === 'local' ? colorize() : json()
}

export const logger = winston.createLogger({
  format: combine(
    conditionalColorize(),
    splat(), // allows for value subs like `%s`
    simple()
  ),
  silent: isTest,
  transports: [new winston.transports.Console()]
})
