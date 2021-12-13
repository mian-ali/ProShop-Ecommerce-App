import express from 'express'
const router = express.Router()
import {addOrderItems} from '../controllers/OrderControllers.js'
import { protect } from '../middlewear/authMiddlewear.js'

router.route('/').post(protect, addOrderItems)


export default router