import { Request, Response } from "express";
import { GetActiveOrdersService } from "../../services/order/GetActiveOrdersService";



class GetActiveOrdersController {
    async handle(req: Request, res:Response) {
        const getActiveOrdersService = new GetActiveOrdersService()

        const orders = await getActiveOrdersService.execute()

        return res.json(orders)
    }

}

export { GetActiveOrdersController }