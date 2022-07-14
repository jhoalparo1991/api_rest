const bcrypt = require('bcrypt');
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

const getById = async (req,res)=>{
    try {
       const users = await userModel.findById({_id: req.params.id});
       return res.status(200).json({
            message: 'Get one user',
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
        const password = data.password;

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password,salt);

        const newUser = new userModel({
            name:data.name,
            lastname:data.lastname,
            email:data.email,
            password:hashPassword,
            rol:data.rol,
        })
       
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

const updateUser = async(req,res)=>{
    try {
        const {name,lastname,email} = req.body;
        const {id} = req.params;

        const editUser = new userModel({
            name,lastname,email
        })

        const existEmail = await userModel.findOne({email})

        if(existEmail.id !== id){
            return res.status(400).json({message:'This email already exists in other user'})
        }else{

            await userModel.findByIdAndUpdate({_id:id},{name,lastname,email},{ new:true},(err,data)=>{
                if(err) return res.status(404).json({message:'Task not found'});
                return   res.json({
                    data
                })
            })
        
        }

     } catch (error) {
         return res.status(501).json(
             error.message
         );
     }
}


const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;

        const existId = await userModel.findById(id)

        if(!existId){
            return res.status(400).json({message:'The user not found'})
        }else{
            await userModel.findByIdAndDelete(id,(err,data)=>{
                if(err) return res.status(404).json({ message:err.message });
                return   res.json({message:'User delete successfully'})
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
    getById,
    createUser,
    updateUser,
    deleteUser
}