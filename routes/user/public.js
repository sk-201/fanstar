const router=require('express').Router();
const {generateOTP,verify,getArtist,getServicesofAnArtist}=require('../../controllers/user/public');

//Get an artist
//Route : '/api/user/private/getartist/:artistId'
//Method : GET
//Body : {artistId}
//Params : N/A
//Token : NO
router.get('/getartist/:artistId',getArtist);

//Get services of an artist
//Route : '/api/user/private/getservices/:artistId'
//Method : GET
//Body : {artistId}
//Params : N/A
//Token : NO
router.get('/getservices/:artistId',getServicesofAnArtist);

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