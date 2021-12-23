const router=require('express').Router();
const {generateOTP,verify}=require('../../controllers/user/public');

//Generate OTP
router.post('/generateotp',generateOTP);

//Verify OTP
router.post('/verify',verify);

module.exports=router;