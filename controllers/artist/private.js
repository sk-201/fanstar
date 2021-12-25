const { json } = require('body-parser');
const Service=require('../../models/Service');

//Create service
exports.createService=async(req,res)=>{
    try {
        const {serviceName,amount,description}=req.body;
        const service=new Service({serviceName,amount,description,createdBy:req.artist});
        await service.save();
        res.status(201).json({message:"Service created!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Update service
exports.updateService=async(req,res)=>{
    try {
        const {serviceId}=req.params;
        const {serviceName,amount,description}=req.body;
        const service=await Service.findOne({_id:serviceId});
        if(!service) res.status(400).json({error:"Service not found!"});
        else{
            if(service.createdBy.toString().trim()!=req.artist._id.toString().trim()) res.status(400).json({error:"Only admin can update his/her service!"});
            else{
                await Service.updateOne({_id:serviceId},{
                    $set:{
                        serviceName,amount,description
                    }
                })
                res.status(200).json({message:"Service updated!"});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get own services
exports.getOwnServices=async(req,res)=>{
    try {
        const services=await Service.find({createdBy:req.artist._id}).populate("createdBy");
        res.status(200).send(services);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}