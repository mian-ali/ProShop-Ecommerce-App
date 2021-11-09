// require mongo
import  mongoose from "mongoose";

// DB Connection
const connectDB= async ()=>{

    try {
        const conn=await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        // catch response error        
    } catch (error) {  
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1)
    }
}
export default connectDB