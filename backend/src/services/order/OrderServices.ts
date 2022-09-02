import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";


interface OrderRequest {
    table: number,
    name: string
}

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {

        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name
            }
        })
        return order
    }
}

export {
    CreateOrderService
}