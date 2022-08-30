import prismaClient from '../../prisma/prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
  name: string,
  email: string,
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {


    // Verify field email 
    if (!email) {
      throw new Error('Digite um e-mail.')
    }

    // Verify if email exists on DB
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    const passwordHash = await hash(password, 8)

    // Return error if email exists
    if (userAlreadyExists) {
      throw new Error('Esse e-mail já está cadastrado.')
    }

    // Insert data on DB
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  }

}

export { CreateUserService }
