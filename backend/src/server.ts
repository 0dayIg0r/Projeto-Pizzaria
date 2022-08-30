import express, {Request, Response} from 'express'
import { router } from './routes'

import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.use(router)

app.listen(process.env.PORT, () =>{
    console.log('Server is running !')
})