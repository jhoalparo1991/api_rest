const { Schema, model  } = require('mongoose');

const userSchema = new Schema({

    name:{
        type:String,
        required:[true,'The name is required']
    },
    lastname:{
        type:String,
        required:[true,'The lastname is required']
    },
    email:{
        type:String,
        required:[true,'The email is required']
    },
    password:{
        type:String,
        required:[true,'The password is required']
    },
    rol:{
        type:String,
        enum:['user','admin'],
        message:'{VALUE} is not allowed',
        default:'user'
    },


});

userSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

userSchema.set('toJSON',{
    virtuals:true
})

module.exports = model('user',userSchema);
