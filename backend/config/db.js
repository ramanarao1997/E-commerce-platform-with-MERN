import colors from 'colors'
import mongoose from 'mongoose'

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`Connected to MongoDB successfully: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectToDB