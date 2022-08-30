import prismaClient from "../../prisma/prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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

        if (!passwordMatch) {
            throw new Error('A senha está incorreta')
        }

        // Generate JWT
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn:'7d'
            }
        )
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }
