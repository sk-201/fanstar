const router=require('express').Router();
const {generateOTP,verify}=require('../../controllers/user/public');

//Generate OTP
//Route : '/api/user/public/generateotp'
//Request : POST
//Body : {phone}
//Params : N/A
router.post('/generateotp',generateOTP);

//Verify OTP
//Route : '/api/user/public/verify'
//Request : POST
//Body : {phone,code}
//Params : N/A
router.post('/verify',verify);

module.exports=router;