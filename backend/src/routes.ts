import {Router} from 'express'
import { createUserController } from './controllers/user/UserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'



const router = Router()
// USER ROUTES
router.post('/register', new createUserController().handle)
router.post('/login', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

export {router}