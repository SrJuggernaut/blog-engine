import { LogInData, SignUpData, JWTPayload } from '@interfaces/authInterfaces'
import { AuthenticationError } from 'apollo-server-errors'
import bcrypt from 'bcrypt'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

import { jwtSecret } from '@config/serverConfig'
import { createUser, getUser } from './userServices'

const SALT_ROUNDS = 10

export const signUp = async (user: SignUpData) => {
  user.password = await generateHash(user.password)
  const signedUpUser = await createUser(user)
  signedUpUser.token = generateJWT(signedUpUser._id)
  delete signedUpUser.password
  return signedUpUser
}

export const logIn = async (credentials: LogInData) => {
  const user: any = await getUser({ email: credentials.email })
  if (!user) {
    throw new AuthenticationError("That password / email combination doesn't exist")
  }
  const passwordMatch = await compareHash(credentials.password, user.password)
  if (!passwordMatch) {
    throw new AuthenticationError("That password / email combination doesn't exist")
  }
  user.token = generateJWT({ sub: user._id.toString() })
  delete user.password
  return user
}

export const generateHash = async (password: string) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  return hash
}

export const compareHash = async (password: string, hash: string) => {
  const match: boolean = await bcrypt.compare(password, hash)
  return match
}

export const generateJWT = (data: any) => {
  const token = jwt.sign({ ...data }, jwtSecret, { expiresIn: 7200 })
  return token
}

export const verifyJWT = (token: string) => {
  try {
    const data = jwt.verify(token, jwtSecret) as JWTPayload
    return data
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AuthenticationError(`Session expired at ${error.expiredAt}`)
    }
    throw new Error(error.message)
  }
}
