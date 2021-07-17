import { Redis } from 'ioredis'

export const connections: Record<string, Redis> = {}
