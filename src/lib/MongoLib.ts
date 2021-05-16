import { MongoClient, ObjectId } from 'mongodb'
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

const MONGO_URI = `mongodb${dbSrv}://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}?authSource=${dbAuthSource}?retryWrite=true?w=majority`

class MongoLib {
  static connection: any
  client: MongoClient
  dbName: string
  constructor () {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
    this.dbName = dbName
  }

  async connect () {
    if (!MongoLib.connection) {
      try {
        // Connect client to the server
        const connection = await this.client.connect()
        // Establish and verify connection
        await connection.db(dbName).command({ ping: 1 })
        console.log('Connected successfully to database')
        // set Connection
        MongoLib.connection = connection
      } catch (error) {
        console.error(error)
      }
    }
    return MongoLib.connection
  }

  async getAll (collection: string, query: object): Promise<[] | void> {
    try {
      const db = await this.connect()
      const res = await db.collection(collection).find(query).toArray()
      return res
    } catch (error) {
      console.error(error)
    }
  }

  async get (collection: string, id: string): Promise<object | void> {
    try {
      const db = await this.connect()
      const res = db.collection(collection).findOne({ _id: new ObjectId(id) })
      return res
    } catch (error) {
      console.error(error)
    }
  }

  async create (collection: string, data: object): Promise<string | void> {
    try {
      const db = await this.connect()
      const res = db.collection(collection).insertOne(data)
      return res.insertedID
    } catch (error) {
      console.error(error)
    }
  }

  async update (
    collection: string,
    id: string,
    data: object
  ): Promise<string | void> {
    try {
      const db = await this.connect()
      const res = db
        .collection(collection)
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: data },
          { upsert: true, new: true }
        )
      return res.upsertedId || id
    } catch (error) {
      console.error(error)
    }
  }

  async delete (collection: string, id: string): Promise<string | void> {
    try {
      const db = await this.connect()
      db.collection(collection).deleteOne({ _id: new ObjectId(id) })
      return id
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = MongoLib
