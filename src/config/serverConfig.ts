import dotenv from 'dotenv'

export const environment: string = process.env.NODE_ENV || 'development'

dotenv.config({ path: `.env.${environment}` })

export const serverPort: number = parseInt(process.env.PORT || '4000')
export const jwtSecret: string = process.env.JWT_SECRET || ''

export const dbSrv: string = process.env.DB_SRV === 'true' ? '+srv' : ''
export const dbUser: string = process.env.DB_USER || ''
export const dbPassword: string = process.env.DB_PASSWORD || ''
export const dbName: string = process.env.DB_NAME || ''
export const dbHost: string = process.env.DB_HOST || ''
export const dbAuthSource: string = process.env.DB_AUTH_SOURCE || ''
export const dbPort: string = process.env.DB_PORT || ''

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
