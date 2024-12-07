import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'

const connectDB = async () => {

    try {
        
        const connectionInstance = await mongoose.connect(
          `${process.env.DB_URL}/${DB_NAME}`
        );

        console.log(`Data base is connected >> DB Host ${connectionInstance.connection.host}`)

    } catch (error) {
        
        console.log(`Database Connection Failed DB/Index`, error)
    }
}

export default connectDB;