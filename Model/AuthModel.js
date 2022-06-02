const mongoose=require('mongoose')
const AuthSchema=mongoose.Schema


const AuthData=new AuthSchema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})


module.exports=mongoose.model("userdata",AuthData)