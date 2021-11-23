import express from 'express';     
import dotenv from 'dotenv';
import colors from 'colors' //import colors from npm
import connectDB from './config/db.js'; //db file import
import productsRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

import {notFound , errorHandler} from './middlewear/errorMiddlewear.js'
dotenv.config();
connectDB()
const app = express()
app.use(express.json())

// app.use((req , res , next)=>{
//   console.log(req.originalUrl);
//   next()
// })
// get routes
app.get('/', (req, res) => {
    res.send('Api is running.....')
});

//Product rendering in server route
// this route  Move In productsRoutes
//single product rendering in server route 
// this route Move In productsRoutes
app.use("/api/products", productsRoutes)
app.use("/api/users" , userRoutes)


// any wornge route enter  error 
app.use(notFound)
// id error
app.use(errorHandler)
//runnig on this port
const PORT =process.env.PORT || 5000
app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
  );
