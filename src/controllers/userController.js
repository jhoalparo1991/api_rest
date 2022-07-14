const userModel = require('../models/usersModel');

const getAll = async (req,res)=>{
    try {
       const users = await userModel.find({});
       return res.status(200).json({
            message: 'List user',
            data : users
       });
    } catch (error) {
        return res.status(501).json(
            error.message
        );
    }
}

const createUser = async(req,res)=>{
    try {
        const data = req.body;
        const newUser = new userModel(data)
        const existEmail = await userModel.findOne({email:data.email})

        if(existEmail){
            return res.status(200).json({message:'This email already exists'})
        }else{
            await newUser.save((err,dat)=>{
                if (err) {
                    return res.status(501).json({
                        error: err.message
                    })
                }else{
                    return res.status(201).json({
                        message:'User create successfully',
                        dat
                    })
                }
            })
        }
     

     } catch (error) {
         return res.status(501).json(
             error.message
         );
     }
}






module.exports = {
    getAll,
    createUser
}