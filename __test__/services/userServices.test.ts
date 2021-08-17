import { SignUpData } from '@interfaces/authInterfaces'
import { start, stop } from '@lib/mongoLib'
import { generatePerson } from '@mocks/userMock'
import {
  createUser,
  deleteUser,
  getUser,
  updateUser
} from '@services/userServices'
import { UserInputError } from 'apollo-server-errors'

const PERSON = generatePerson()

beforeAll(async () => {
  await start()
})

afterAll(async () => {
  await stop()
})

describe('User Services', () => {
  it('should create a user', async () => {
    const userToCreate = {
      email: PERSON.email,
      userName: PERSON.userName,
      password: PERSON.password
    }
    const newUser = await createUser(userToCreate)
    PERSON.id = newUser.id.toString()
    expect(newUser.email).toMatch(PERSON.email)
    expect(newUser.userName).toMatch(PERSON.userName)
    expect(newUser.password).toMatch(PERSON.password)
  })

  it('should throw duplicated user Error', async () => {
    const userToCreate = {
      email: PERSON.email,
      userName: PERSON.userName,
      password: PERSON.password
    }
    await expect(createUser(userToCreate)).rejects.toThrow(UserInputError)
    await expect(createUser(userToCreate)).rejects.toThrow(/ is already in use/)
  })

  it('should throw an user validation error', async () => {
    const userToCreate = {} as SignUpData
    await expect(createUser(userToCreate)).rejects.toThrow(Error)
  })

  it('should get user', async () => {
    const user = await getUser({ _id: PERSON.id })
    expect(user._id.toString()).toMatch(PERSON.id)
    expect(user.userName).toMatch(PERSON.userName)
    expect(user.password).toMatch(PERSON.password)
  })

  it("should throw an User doesn't exist", async () => {
    const query = { _id: '444444444444444444444444' }
    await expect(getUser(query)).rejects.toThrow(Error)
    await expect(getUser(query)).rejects.toThrow("User doesn't exist")
  })

  it('should edit user', async () => {
    const query = { _id: PERSON.id }
    const dataToEdit = { description: PERSON.description }
    const editedUser = await updateUser(query, dataToEdit)
    expect(editedUser.description).toMatch(PERSON.description)
  })

  it("should throw an User can't be edited", async () => {
    const query = { _id: '444444444444444444444444' }
    const dataToEdit = { description: PERSON.gender }
    await expect(updateUser(query, dataToEdit)).rejects.toThrow(Error)
    await expect(updateUser(query, dataToEdit)).rejects.toThrow(
      "User doesn't exist or can't be edited"
    )
  })

  it('should delete previously created user', async () => {
    const deletedUser = await deleteUser({ _id: PERSON.id })
    expect(deletedUser._id.toString()).toMatch(PERSON.id)
  })

  it("should throw an User can't be deleted", async () => {
    const query = { _id: '444444444444444444444444' }
    await expect(deleteUser(query)).rejects.toThrow(Error)
    await expect(deleteUser(query)).rejects.toThrow("User doesn't exist")
  })
})
