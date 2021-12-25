const router=require('express').Router();
const {generateOTP,verify}=require('../../controllers/user/public');

//Generate OTP
//Route : '/api/user/public/generateotp'
//Method : POST
//Body : {phone}
//Params : N/A
//Token : No
router.post('/generateotp',generateOTP);

//Verify OTP
//Route : '/api/user/public/verify'
//Method : POST
//Body : {phone,code}
//Params : N/A
//Token : No
router.post('/verify',verify);

module.exports=router;