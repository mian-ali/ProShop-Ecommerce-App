import asyncHandle from 'express-async-handler';
import Product from '../models/productModel.js'




//@dec       Fehct all Products
//@route     GET /api/products
//@access    Public

const getProducts = asyncHandle(async(req,res)=>{

    const products=await Product.find({})
    // res.status(401)
    // throw new Error("Not authorized") error get for products
    // throw new Error("Some thing Wrong")
    res.json(products);
})


//@dec       Fehct single Product
//@route     GET /api/products/:id
//@access    Public
const getProductById = asyncHandle(async(req,res)=>{

    const product =await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    }else{
        res.status(404)
        throw new Error("Product Not Found")
    }
})

//@dec       Delete product
//@route     DELETE /api/products/:id
//@access    Private /admin
const deleteProduct = asyncHandle(async(req,res)=>{

    const product =await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.send({message: "Product deleted successfully"})
    }else{
        res.status(404)
        throw new Error("Product Not Found")
    }
})

export { getProducts, getProductById , deleteProduct}