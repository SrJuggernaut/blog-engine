import {
  environment,
  serverPort,
  dbSrv,
  dbUser,
  dbPassword,
  dbName,
  dbHost,
  dbAuthSource,
  dbPort
} from './serverConfig'

describe('Test env variables', () => {
  test('NODE_ENV to be "test"', () => {
    expect(environment).toBe('test')
  })
  test('server port is defined', () => {
    expect(serverPort).toBe(parseInt(process.env.PORT || '4000'))
  })
  test('database in srv DNS', () => {
    expect(dbSrv).toBe(process.env.DB_SRV === 'true' ? '+srv' : '')
  })
  test('database user is defined', () => {
    expect(dbUser).toBe(process.env.DB_USER)
  })
  test('database password is defined', () => {
    expect(dbPassword).toBe(process.env.DB_PASSWORD)
  })
  test('database name is defined', () => {
    expect(dbName).toBe(process.env.DB_NAME)
  })
  test('database host is defined', () => {
    expect(dbHost).toBe(process.env.DB_HOST)
  })
  test('database authentication source is defined', () => {
    expect(dbAuthSource).toBe(process.env.DB_AUTH_SOURCE)
  })
  test('database port is defined', () => {
    expect(dbPort).toBe(process.env.DB_PORT)
  })
})
