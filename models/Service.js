const mongoose=require('mongoose');
const moment=require('moment');

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
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        time:{
            type:String,
            default:moment().format()
        }
    }]
},{timestamps:true})

const Service=new mongoose.model("service",serviceSchema);

module.exports=Service;