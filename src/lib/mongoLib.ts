import { connect, connection } from 'mongoose'
import {
  dbSrv,
  dbUser,
  dbPassword,
  dbName,
  dbHost,
  dbAuthSource,
  dbPort
} from '@config/serverConfig'

const USER = encodeURIComponent(dbUser)
const PASSWORD = encodeURIComponent(dbPassword)

const MONGO_URI = `mongodb${dbSrv}://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`

export const start = async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      authSource: dbAuthSource,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  } catch (error) {
    console.log(error)
  }
}

export const stop = async () => {
  await connection.close()
}
