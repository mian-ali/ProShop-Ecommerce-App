import asyncHandle from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'




//@dec       auth user & get token
//@route     POST /api/users/login
//@access    Public

const authUsers = asyncHandle(async(req,res)=>{

    const {email , password} = req.body
    // res.send({ email , password })

    const user = await User.findOne({ email})
    if (user && (await user.matchPassword(password))) {
        
        res.json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invaild email and password")
    }
})


//@dec       Register User a new
//@route     POST /api/users
//@access    Public

const  registerUser = asyncHandle(async(req,res)=>{

     const { name  ,email , password} = req.body

    const userExists = await User.findOne({ email})
    if (userExists){

        res.status(400)
        throw new Error("User Already exists")
    }
   const user = await User.create({ name, email, password})
   if (user){
       res.status(201).json({ 

        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)

       })

   } else{
       res.status(400)
       throw new Error("Invaild user Data")
   }
})




//@dec       GET user & profile
//@route     GET /api/users/profile
//@access    Private

const getUserProfile = asyncHandle(async(req,res)=>{
 
    // res.send("Succes")
    const user = await User.findById(req.user._id)

    if (user) {
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})


//@dec       Update user & profile
//@route     Put /api/users/profile
//@access    Private
const updateUserProfile = asyncHandle(async(req,res)=>{
 
    const user = await User.findById(req.user._id)

    if (user) {
        user.name =req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({ 
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})


//@dec       GET All Users
//@route     GET /api/users
//@access    Private/admin 

const getUser = asyncHandle(async(req,res)=>{
 
    const users = await User.find({})
    res.json(users)
})

//@dec       Delete User
//@route     Delete /api/users/:id
//@access    Private/admin 

const deleteUser = asyncHandle(async(req,res)=>{
 
    const user = await User.findById(req.params.id)
    if (user) {
         await user.remove()
         res.send({message:"User deleted successfully"})
    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})


//@dec       GET Users by id
//@route     GET /api/users/:id
//@access    Private/admin 

const getUserById = asyncHandle(async(req,res)=>{
 
    const user = await User.findById(req.params.id).select('-password')
    if(user) {

        res.json(user)

    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})


//@dec       Update user 
//@route     Put /api/users/:id
//@access    Private/admin

const updateUser = asyncHandle(async(req,res)=>{
 
    const user = await User.findById(req.params.id)

    if (user) {
        user.name =req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin=req.body.isAdmin || user.isAdmin
        const updatedUser = await user.save()
        res.json({ 
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
                    
        })
    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})



export  {authUsers , registerUser ,getUserProfile, updateUserProfile , getUser , deleteUser ,getUserById ,updateUser}