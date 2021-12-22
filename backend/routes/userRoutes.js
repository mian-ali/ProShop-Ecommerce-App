import express from 'express'
const router = express.Router();
import { authUsers , registerUser ,getUserProfile , updateUserProfile , getUser , deleteUser} from '../controllers/userControllers.js'
import {protect , admin } from '../middlewear/authMiddlewear.js'


router.route('/').post( registerUser).get(protect, admin ,getUser)
router.post('/login' , authUsers)
router.route('/profile').get(protect,getUserProfile).put(protect ,updateUserProfile)
router.route('/:id').delete(protect, admin ,deleteUser)


export default router