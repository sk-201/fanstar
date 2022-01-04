const mongoose = require('mongoose');
const Message=require('../../models/Chat');
const {successmessage, errormessage} =require('./util');


exports.checkroom=async (roomid)=>{
    let room=await Message.findOne({roomid});
    if(room){
       let room1=await Message.findOne({roomid,memberslength:{$lt:2}});
       if(room1){
           return successmessage("success");
       }
       return errormessage("room full!");
    }

    return successmessage("Success");
}

exports.addinroom=async(member,roomid)=>{
    try{

        let room=await Message.findOneAndUpdate({roomid},{$inc:{memberslength:1}},{new:true});
        if(!room){
            let message=new Message({
                roomid,
                members:[mongoose.Schema.Types.ObjectId(member)],
                memberslength:1,
                messages:[]
            });
            await message.save();
        }
    }catch(err){
        console.log(err.message);
        return errormessage(err.message);
    }
    
}

exports.storeMessage=async(message,sender,reciever)=>{

    let updates={
        sender:mongoose.Types.ObjectId(sender),
        reciever:mongoose.Types.ObjectId(reciever),
        message,
        created:Date.now
    }

    let findConditions={
        members:{$or:[[
            mongoose.Types.ObjectId(sender),
            mongoose.Types.ObjectId(reciever)
        ],[
            mongoose.Types.ObjectId(reciever),
            mongoose.Types.ObjectId(sender)
        ]]}
        }

    await Message.findOneAndUpdate(findConditions,{$push:{messages:updates}});
}

exports.userunmatched=async(roomid)=>{
    await Message.findOneAndDelete({roomid});
}