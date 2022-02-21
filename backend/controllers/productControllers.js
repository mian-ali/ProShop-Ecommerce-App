import asyncHandle from 'express-async-handler';
import Product from '../models/productModel.js'




//@dec       Fehct all Products
//@route     GET /api/products
//@access    Public

const getProducts = asyncHandle(async(req,res)=>{
  const pageSize=10
  const page=Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  }:{}
    const count=await Product.countDocuments({...keyword})
    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))

    res.json({products , page , pages: Math.ceil(count / pageSize)});
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

//@dec       Create a product
//@route     POST /api/products
//@access    Private /admin

const createProduct = asyncHandle(async(req,res)=>{
  const product= new Product({
      name:"Sample Name",
      price:0,
      user:req.user._id,
      image:"/images/sample.jpg",
      brand: "Sample brand ",
      category:"Sample Category",
      countInStock:0,
      numReviews:0,
      description:"Sample description"
  })

  const createdProduct = await  product.save()
  res.status(201).json(createdProduct)
})


//@dec       Update a product
//@route     Put /api/products/:id
//@access    Private /admin

const updateProduct = asyncHandle(async(req,res)=>{
   
    const { name , price  , description, image , brand , category , countInStock} = req.body

    const product=await Product.findById(req.params.id)

    if(product){

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await  product.save()
        res.json(updatedProduct)

    }else{
        res.status(404)
        throw new Error("Product Not Found") 
    }
  })

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandle(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandle(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export { getProducts, getProductById , deleteProduct , updateProduct, createProduct,createProductReview,getTopProducts}