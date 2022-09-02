import { Response, Request } from "express";
import { SendOrderServce } from "../../services/order/SendOrderServce";

class SendOrderController {
    async handle(req: Request, res: Response) {

        const {order_id} = req.body
        
        const sendOrder = new SendOrderServce()

        const order =  await sendOrder.execute({
            order_id
        })
        return res.json(order)
    }
}

export {
    SendOrderController
}