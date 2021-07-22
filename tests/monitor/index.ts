import Redis from 'ioredis'

const Client = new Redis()
const msBetweenPings = 5000

const main = async () => {
  setInterval(async () => {
    await Client.ping()
  }, msBetweenPings)
}

main()
