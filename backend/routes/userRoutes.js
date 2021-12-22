import express from 'express'
const router = express.Router();
import { authUsers , registerUser ,getUserProfile , updateUserProfile , getUser} from '../controllers/userControllers.js'
import {protect , admin } from '../middlewear/authMiddlewear.js'


router.route('/').post( registerUser).get(protect, admin ,getUser)
router.post('/login' , authUsers)
router.route('/profile').get(protect,getUserProfile).put(protect ,updateUserProfile)


export default router