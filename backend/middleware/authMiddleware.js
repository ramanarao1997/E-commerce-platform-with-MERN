import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/user.js'

const verifyBearerToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization
    let signedToken

    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            signedToken = authHeader.split(' ')[1]

            const decodedToken = jwt.verify(signedToken, process.env.JWT_SECRET)

            req.user = await User.findById(decodedToken.id).select('-password')
            next()

        } catch (error) {
            console.error(error)
            res.status(401)

            throw new Error("Could not authorize, invalid token!")
        }
    }

    if (!signedToken) {
        res.status(401)
        throw new Error("Could not authorize, no token!")
    }
})

export { verifyBearerToken }