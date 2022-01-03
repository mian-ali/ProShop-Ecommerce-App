import express from 'express'
const router = express.Router()
import {addOrderItems , getOrderById, updateOrderToPaid , getMyOrders , getOrders , updateOrderToDelivered} from '../controllers/OrderControllers.js'
import { protect , admin } from '../middlewear/authMiddlewear.js'

router.route('/').post(protect, addOrderItems).get(protect , admin , getOrders)
router.route('/myorders').get(protect, getMyOrders)

router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)




export default router