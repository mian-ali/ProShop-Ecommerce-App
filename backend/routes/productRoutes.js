import express from 'express'
const router = express.Router();
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@dec       Fehct all Products
//@route     GET /api/products
//@access    Public
router.get('/', asyncHandler(async(req, res) => {
    const products=await Product.find({})
    // res.status(401)
    // throw new Error("Not authorized") error get for products
    res.json(products);
}))
//@dec       Fehct single Product
//@route     GET /api/products/:id
//@access    Public
router.get('/:id', asyncHandler(async(req, res) => {
    const product =await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    }else{
        res.status(404)
        throw new Error("Product Not Found")
    }
    // res.json(product);
}))

export default router