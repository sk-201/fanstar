const router=require('express').Router();
const {buyServices,order,capture,buyAlbum,getArtist}=require('../../controllers/user/private');
const {protectUser}=require('../../middlewares/protect');

//Get an artist
//Route : '/api/user/private/getartist/:artistId'
//Method : GET
//Body : {artistId}
//Params : N/A
//Token : Yes
router.get('/getartist/:artistId',protectUser,getArtist);

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

//Recharge wallet (capture)
//Route : '/api/user/private/buyalbum'
//Method : POST
//Body : {albumId}
//Params : N/A
//Token : Yes
router.post('/buyalbum',protectUser,buyAlbum);

module.exports=router;