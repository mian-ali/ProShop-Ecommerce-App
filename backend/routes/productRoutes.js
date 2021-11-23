import express from 'express'
const router = express.Router();
import {getProducts, getProductById} from '../controllers/productControllers.js'


router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router