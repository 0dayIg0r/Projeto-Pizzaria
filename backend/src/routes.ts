import { Router } from 'express'
import multer from 'multer'

// CONTROLLERS
import { CreateUserController } from './controllers/user/UserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/products/ProductsController'
import { ListByCategoryController } from './controllers/products/ListByCategoryController'
import { CreateOrderController } from './controllers/order/OrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'

// MIDDLEWARES
import { isAuthenticated } from './middlewares/isAuthenticated'

// MULTER CONFIG
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
router.get('/category/products', isAuthenticated, new ListByCategoryController().handle)

// ORDER ROUTES
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)


export { router }