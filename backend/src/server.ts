import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'

import { router } from './routes'

import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.use((e: Error, req: Request, res:Response, next: NextFunction) =>{
    if(e instanceof Error){
        // If instance of type error
        return res.status(400).json({
            error: e.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})



app.listen(process.env.PORT, () =>{
    console.log('Server is running !')
})