import {Router} from 'express'
import { createUserController } from './controllers/user/UserController'
import { AuthUserController } from './controllers/user/AuthUserController'



const router = Router()
// USER ROUTES
router.post('/register', new createUserController().handle)
router.post('/login', new AuthUserController().handle)

export {router}