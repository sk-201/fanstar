const Artist = require('../../models/Artist');
const Service=require('../../models/Service');
const fs=require('fs');
const util=require('util');
const unlinkFile = util.promisify(fs.unlink);
const {readImage,uploadImage,deleteImage}=require('./aws');

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

//Upload image
exports.uploadFile=async(req,res)=>{
    try {
        const file=req.file;
        let data=await uploadImage(file);
        await Artist.updateOne({_id:req.artist._id},{
            $push:{
                uploadedFiles:data
            }
        });
        unlinkFile(file.path);
        res.status(201).json({message:"File uploaded!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Read file
exports.readFile=async(req,res)=>{
    try {
        const {fileKey}=req.params;
        const data=await readImage(fileKey);
        const receivedFile=Buffer.from(data).toString('base64');
        // console.log(receivedFile);
        res.status(200).send(receivedFile);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Delete image
exports.deleteFile=async(req,res)=>{
    try {
        const {fileKey}=req.params;
        await deleteImage(fileKey);
        await Artist.updateOne({_id:req.artist._id},{
            $pull:{
                uploadedFiles:fileKey
            }
        })
        res.status(200).json({message:"File deleted!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}
