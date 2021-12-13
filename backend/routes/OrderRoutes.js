import express from 'express'
const router = express.Router()
import {addOrderItems , getOrderById } from '../controllers/OrderControllers.js'
import { protect } from '../middlewear/authMiddlewear.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)



export default router