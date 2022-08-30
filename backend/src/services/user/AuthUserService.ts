import prismaClient from "../../prisma/prisma";
import { compare } from 'bcryptjs'

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        // Verifiy if email exists on DB
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error('E-mail não cadastrado')
        }

        // Verifiy password
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error ('A senha está incorreta')
        }

        // Generate JWT
    }
}

export { AuthUserService }
