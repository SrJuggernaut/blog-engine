require('dotenv').config({ path: `/.env.${process.env.NODE_ENV}` })

export const environment: string = process.env.NODE_ENV || 'development'

export const serverPort: number = parseInt(process.env.PORT || '4000')

export const dbSrv: string = process.env.DB_SRV === 'true' ? '+srv' : ''
export const dbUser: string = process.env.DB_USER || ''
export const dbPassword: string = ''
export const dbName: string = ''
export const dbHost: string = ''
export const dbAuthSource: string = ''
export const dbPort: string = ''

export default {
  environment,
  serverPort,
  dbSrv,
  dbUser,
  dbPassword,
  dbName,
  dbHost,
  dbAuthSource,
  dbPort
}
