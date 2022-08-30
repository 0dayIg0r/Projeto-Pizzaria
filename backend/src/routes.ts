import {Router, Request, Response, application} from 'express'

const router = Router()

router.get('/teste', (req:Request, res:Response) =>{
    return res.json({API: true})
})

export {router}