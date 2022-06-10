import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import openBrowser from 'open'

import { port } from '@/constants'

/** Handles the parsing of cmd line args, sets the config accordingly */
export const handleCli = async () => {
  const { open, 'silence-logs': silenceLogs } = await yargs(hideBin(process.argv))
    .alias('h', 'help')
    .alias('o', 'open')
    .options('open', {
      type: 'boolean',
      default: false,
      describe: 'Open browser.'
    })
    .options('silence-logs', {
      type: 'boolean',
      default: false,
      describe: 'Silences the logs'
    })
    .help()
    .version()
    .alias('version', 'v')
    .strict().argv

  if (open) {
    setTimeout(async () => {
      await openBrowser(`http://localhost:${port}/keys`)
    }, 4000)
  }
  if (silenceLogs) process.env.RED_FIVE_SILENCE_LOGS = 'true'
}
