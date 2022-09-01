import prismaClient from "../../prisma/prisma";

interface CategoryRequest {
    name: string
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {

        if (name === '') {
            throw new Error('Digite seu nome')
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true
            }
        })
        return category
    }
}

export { CreateCategoryService }