const router=require('express').Router();
const {generateOTP,verify}=require('../../controllers/artist/public');

//Generate OTP
//Route : '/api/artist/public/generateotp'
//Request : POST
//BODY : {phone}
//Params : NA
router.post('/generateotp',generateOTP);

//Verify OTP
//route : '/api/artist/public/verify'
//Request : POST
//BODY : {phone,code}
//Params : NA
router.post('/verify',verify);

module.exports=router;