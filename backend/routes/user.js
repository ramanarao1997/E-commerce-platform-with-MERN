import express from 'express'

import { registerUser, authUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'

import { verifyBearerToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/register').post(registerUser)
router.post('/login', authUser)

router.route('/profile')
    .get(verifyBearerToken, getUserProfile)
    .put(verifyBearerToken, updateUserProfile)

export default router