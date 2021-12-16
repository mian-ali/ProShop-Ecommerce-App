import express from 'express'
const router = express.Router()
import {addOrderItems , getOrderById, updateOrderToPaid } from '../controllers/OrderControllers.js'
import { protect } from '../middlewear/authMiddlewear.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)




export default router