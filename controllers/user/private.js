const User=require('../../models/User');
const Artist=require('../../models/Artist');
const Service=require('../../models/Service');

//Buy service
exports.buyServices=async(req,res)=>{
    try {
        const {serviceId}=req.body;
        const service=await Service.findOne({_id:serviceId});
        if(!service) res.status(400).json({error:"Service not found!"});
        else{
            let uBalance=parseFloat(req.user.balance);
            let servicePrice=parseFloat(service.amount);
            if(uBalance>=servicePrice){
                await Service.updateOne({_id:serviceId},{
                    $push:{
                        users:req.user._id
                    }
                })
                const artist=await Artist.findOne({_id:service.createdBy});
                let aBalance=parseFloat(artist.balance);
                aBalance=aBalance+(servicePrice*70.00/100.00);
                aBalance=aBalance.toString();
                await Artist.updateOne({_id:artist._id},{
                    $set:{
                        balance:aBalance
                    }
                })
                uBalance=uBalance-servicePrice;
                uBalance=uBalance.toString();
                await User.updateOne({_id:req.user._id},{
                    $set:{
                        balance:uBalance
                    }
                })
                res.status(200).json({message:"Service added!"});
            }
            else res.status(400).json({error:"User doesn't have enough balance!"});
    
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}