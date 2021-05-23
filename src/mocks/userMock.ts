import faker from 'faker'

faker.locale = 'es'

export const generatePerson = () => {
  class Person {
    id: string = '1'
    gender: string = faker.name.gender()
    firstName: string = faker.name.firstName()
    lastName: string = faker.name.lastName()
    userName: string = faker.internet.userName(this.firstName, this.lastName)
    email: string = faker.internet.email(this.firstName, this.lastName)
    password: string = faker.internet.password()
    description: string = faker.lorem.paragraph()
  }
  return new Person()
}
