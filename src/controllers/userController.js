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


module.exports = {
    getAll
}