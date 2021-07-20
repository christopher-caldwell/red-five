import { serializeError } from 'serialize-error'
import { Resolver, CliResponse } from '@/interfaces'
import { getActiveConnection } from '@/connections'

export const sendCliCommand: Resolver<CliResponse, GetOneKeyArgs> = async ({ command }, { Client }) => {
  const redis = getActiveConnection(Client)
  try {
    const { baseCommand, commandArgs = [] } = parseCommand(command)
    const response = await redis.send_command(baseCommand, commandArgs)
    console.log('response', response)
    return {
      time: Date.now(),
      message: response,
      command
    }
  } catch (e) {
    console.log(serializeError(e))
    throw e
  }
}

export interface GetOneKeyArgs {
  command: string
}

interface ParsedCommand {
  baseCommand: string
  commandArgs?: string[]
}
const parseCommand = (command: string): ParsedCommand => {
  const splitCommand = command.split(' ')
  const baseCommand = splitCommand[0]
  if (splitCommand.length < 2) return { baseCommand }
  splitCommand.shift()
  return {
    baseCommand,
    commandArgs: splitCommand
  }
}
