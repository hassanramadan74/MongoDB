import { userModel } from "../../databases/models/user.model.js"



const checkEmailExist = async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user)return res.json({message:"user already exist"})
    next()
}

export{
    checkEmailExist
}