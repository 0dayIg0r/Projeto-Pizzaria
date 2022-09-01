import {Router} from 'express'
import { createUserController } from './controllers/user/UserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'



const router = Router()
// USER ROUTES
router.post('/register', new createUserController().handle)

router.post('/login', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)


// CATEGORY ROUTES
router.post('/category', new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

// PRODUCTS ROUTES


export {router}