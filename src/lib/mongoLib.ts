import { connect } from 'mongoose'
import {
  dbSrv,
  dbUser,
  dbPassword,
  dbName,
  dbHost,
  dbAuthSource,
  dbPort
} from '../config/serverConfig'

const USER = encodeURIComponent(dbUser)
const PASSWORD = encodeURIComponent(dbPassword)

const MONGO_URI = `mongodb${dbSrv}://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`

const mongoLib = async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      authSource: dbAuthSource,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('Successfully connected to MongoDB')
  } catch (error) {
    console.log(error)
  }
}

export default mongoLib
