const router=require('express').Router();
const {generateOTP,verify}=require('../../controllers/artist/public');

//Generate OTP
//Route : '/api/artist/public/generateotp'
//Method : Post
//Body : {phone}
//Params : N/A
//Token : No
router.post('/generateotp',generateOTP);

//Verify OTP
//route : '/api/artist/public/verify'
//Method : Post
//Body : {phone,code}
//Params : N/A
//Token : No
router.post('/verify',verify);

module.exports=router;