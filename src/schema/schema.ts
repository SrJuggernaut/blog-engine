import { stitchSchemas } from '@graphql-tools/stitch'
import userSchema from './user/userSchema'

const schema = stitchSchemas({
  subschemas: [
    userSchema
  ]
})

export default schema
