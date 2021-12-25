const mongoose=require('mongoose');

const serviceSchema=new mongoose.Schema({
    serviceName:{
        type:String,
        required:true,
        maxlength:100
    },
    amount:{
        type:String,
        required:true
    },
    description:{
        type:String,
        maxlength:1000
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist',
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
},{timestamps:true})

const Service=new mongoose.model("service",serviceSchema);

module.exports=Service;