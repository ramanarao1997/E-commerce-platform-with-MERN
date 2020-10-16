import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import users from './data/users.js'
import products from './data/products.js'

import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/order.js'

import connectToDB from './config/db.js'

dotenv.config()

connectToDB()

const importData = async () => {
    try {
        // clear all collections before loading new data
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)

        // admin user
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported successfully to DB'.green.bold)
        process.exit()
    } catch (error) {
        console.log(`Could not import data to DB: ${error}`.red.bold)
        process.exit(1)
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log('Deleted all data successfully from DB'.red.bold)
        process.exit()
    } catch (error) {
        console.log(`Could not delete data from DB: ${error}`.yellow.bold)
        process.exit(1)
    }
}

if (process.argv[2] === '-d')
    deleteData()
else
    importData()