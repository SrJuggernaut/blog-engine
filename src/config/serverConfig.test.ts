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
  test('environment to be "test"', () => {
    expect(environment).toBe('test')
  })
  test('serverPort to be PORT', () => {
    expect(serverPort).toBe(parseInt(process.env.PORT || '4000'))
  })
  test('dbSrv to be DB_SRV', () => {
    expect(dbSrv).toBe(process.env.DB_SRV === 'true' ? '+srv' : '')
  })
  test('dbUser to be DB_USER', () => {
    expect(dbUser).toBe(process.env.DB_USER)
  })
  test('dbPassword to be DB_PASSWORD', () => {
    expect(dbPassword).toBe(process.env.DB_PASSWORD)
  })
  test('dbName to be DB_NAME', () => {
    expect(dbName).toBe(process.env.DB_NAME)
  })
  test('dbHost to be DB_HOST', () => {
    expect(dbHost).toBe(process.env.DB_HOST)
  })
  test('dbAuthSource to be DB_AUTH_SOURCE', () => {
    expect(dbAuthSource).toBe(process.env.DB_AUTH_SOURCE)
  })
  test('dbPort to be DB_PORT', () => {
    expect(dbPort).toBe(process.env.DB_PORT)
  })
})
