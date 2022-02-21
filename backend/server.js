import path from 'path';
import express from 'express';     
import dotenv from 'dotenv';
import colors from 'colors' //import colors from npm
import morgan from 'morgan';
import connectDB from './config/db.js'; //db file import
import productsRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound , errorHandler} from './middlewear/errorMiddlewear.js'
import orderRoutes from './routes/OrderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'



dotenv.config();
connectDB()
const app = express()

if(process.env.NODE_ENV==='development'){

  app.use(morgan('dev'))
}

app.use(express.json())

// app.use((req , res , next)=>{
//   console.log(req.originalUrl);
//   next()
// })
// get routes
// app.get('/', (req, res) => {
//     res.send('Api is running.....')
// });

//Product rendering in server route
// this route  Move In productsRoutes
//single product rendering in server route 
// this route Move In productsRoutes
app.use("/api/products", productsRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/orders" , orderRoutes)
app.use("/api/upload" , uploadRoutes)


app.get('/api/config/paypal', (req, res)=>
res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname=path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}



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
