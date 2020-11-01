import asyncHandler from 'express-async-handler'

import User from '../models/user.js'
import generateToken from '../utils/generateToken.js'


// @desc: Register a new user
// @route: Post /api/users/profile
// @access: public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
        res.status(400)
        throw new Error("A user with this email already exists!")
    }

    // goes through pre-save in User model to hash the password
    const newUser = await User.create({
        name,
        email,
        password
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data!")
    }
})

// @desc: Authenticate user & get token
// @route: Post /api/users/login
// @access: public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        throw new Error('Invalid email or password!')
    }
})



// @desc: Get user profile
// @route: GET /api/users/profile
// @access: private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("No such user found!")
    }
})



export { registerUser, authUser, getUserProfile }