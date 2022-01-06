const mongoose=require('mongoose');
const moment=require('moment');

const albumSchema=new mongoose.Schema({
    fileUrl:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        maxlength:500,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist'
    }
    ,
    accessedBy:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        time:{
            type:String,
            default:moment().format("hh:mm A")
        }
    }]
},{timestamps:true})

const Album=new mongoose.model('album',albumSchema);

module.exports=Album;