const router=require('express').Router();
const {buyServices,order,capture}=require('../../controllers/user/private');
const {protectUser}=require('../../middlewares/protect');

//Buy service
//Route : '/api/user/private/buyservice'
//Method : PUT
//Body : {serviceId}
//Params : N/A
//Token : Yes
router.put('/buyservice',protectUser,buyServices);

//Recharge wallet (order)
//Route : '/api/user/private/order/:amount'
//Method : GET
//Body : N/A
//Params : {amount}
//Token : Yes
router.get('/order/:amount',protectUser,order);

//Recharge wallet (capture)
//Route : '/api/user/private/capture/:paymentId'
//Method : POST
//Body : {amount}
//Params : {paymentId}
//Token : Yes
router.post('/capture/:paymentId',protectUser,capture);

module.exports=router;