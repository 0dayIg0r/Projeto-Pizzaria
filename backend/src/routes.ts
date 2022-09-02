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
import { SendOrderController } from './controllers/order/SendOrderController'

// MIDDLEWARES
import { isAuthenticated } from './middlewares/isAuthenticated'

// MULTER CONFIG
import uploadConfig from './config/multer'
import { GetActiveOrdersController } from './controllers/order/GetActiveOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'


const router = Router()

const upload = multer(uploadConfig.upload('./tmp'))

// USER ROUTES
// router.get('/me', isAuthenticated, new DetailUserController().handle)
router.post('/register', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)



// CATEGORY ROUTES
router.get('/category', isAuthenticated, new ListCategoryController().handle)

router.post('/category', new CreateCategoryController().handle)


// PRODUCTS ROUTES
router.get('/category/products', isAuthenticated, new ListByCategoryController().handle)

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)


// ORDER ROUTES
router.get('/order', isAuthenticated, new GetActiveOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)


export { router }