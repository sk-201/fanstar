const router=require('express').Router();
const {buyServices}=require('../../controllers/user/private');
const {protectUser}=require('../../middlewares/protect');

//Buy service
//Route : '/api/user/private/buyservice'
//Method : PUT
//Body : {serviceId}
//Params : N/A
//Token : Yes
router.put('/buyservice',protectUser,buyServices);

module.exports=router;