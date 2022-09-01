import {Router} from 'express'
import multer from 'multer'
import { CreateUserController } from './controllers/user/UserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/products/ProductsController'

import uploadConfig from './config/multer'


const router = Router()

const upload = multer(uploadConfig.upload('./tmp'))

// USER ROUTES
router.post('/register', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)


// CATEGORY ROUTES
router.post('/category', new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

// PRODUCTS ROUTES
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)


export {router}