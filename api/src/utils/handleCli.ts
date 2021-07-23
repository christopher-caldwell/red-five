import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import openBrowser from 'open'

import { port } from '@/constants'
import { setToInMemoryCache, logLevelKey } from '@/cache'

/** Handles the parsing of cmd line args, sets the config accordingly */
export const handleCli = async () => {
  const { open, 'log-level': logLevel } = await yargs(hideBin(process.argv))
    .alias('h', 'help')
    .alias('o', 'open')
    .options('open', {
      type: 'boolean',
      default: false,
      describe: 'Open browser.'
    })
    .options('log-level', {
      // open local web-browser to connect to web ui on startup of server daemon too
      type: 'string',
      default: 'silent',
      describe: 'Log level of the running app'
    })
    .help()
    .version()
    .alias('version', 'v')
    .strict().argv

  if (open) await openBrowser(`http://localhost:${port}`)
  setToInMemoryCache(logLevelKey, logLevel)
}
