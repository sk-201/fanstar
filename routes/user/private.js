const router=require('express').Router();
const {buyServices,rechargeWallet,order,capture}=require('../../controllers/user/private');
const {protectUser}=require('../../middlewares/protect');

//Buy service
//Route : '/api/user/private/buyservice'
//Method : PUT
//Body : {serviceId}
//Params : N/A
//Token : Yes
router.put('/buyservice',protectUser,buyServices);

router.put('/rechargewallet',protectUser,rechargeWallet);

router.get('/order',order);

router.post('/capture/:paymentId',capture);

module.exports=router;