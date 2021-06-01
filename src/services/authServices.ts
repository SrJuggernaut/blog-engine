import { LogInData, SignUpData } from '@interfaces/authInterfaces'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../config/serverConfig'
import { JWTPayload } from '../interfaces/userInterfaces'
import { createUser, getUser } from './userServices'

const SALT_ROUNDS = 10

export const signUp = async (user: SignUpData) => {
  user.password = await generateHash(user.password)
  const signedUpUser = await createUser(user)
  signedUpUser.token = generateJWT(signedUpUser._id)
  return signedUpUser
}

export const logIn = async (credentials: LogInData) => {
  const user: any = await getUser({ email: credentials.email })
  user.token = generateJWT(user._id)
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
  const token = jwt.sign({ ...data }, jwtSecret, { expiresIn: 604800 })
  return token
}

export const verifyJWT = (token: string) => {
  try {
    const data = jwt.verify(token, jwtSecret) as JWTPayload
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
