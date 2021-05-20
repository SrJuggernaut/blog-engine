import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../config/serverConfig'
import { JWTPayload } from '../interfaces/userInterfaces'

const SALT_ROUNDS = 10

const genHash = async (password: string) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  return hash
}

const compHash = async (password: string, hash: string) => {
  const match: boolean = await bcrypt.compare(password, hash)
  console.log('password match', match)
  return match
}

const genJWT = (data: any) => {
  const token = jwt.sign({ ...data }, jwtSecret, { expiresIn: 604800 })
  return token
}

const veriJWT = (token: string) => {
  try {
    const data = jwt.verify(token, jwtSecret) as JWTPayload
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export { genHash, compHash, veriJWT, genJWT }
