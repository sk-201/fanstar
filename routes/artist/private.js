const router=require('express').Router();
const {protectArtist}=require('../../middlewares/protect');
const {createService,updateService,getOwnServices}=require('../../controllers/artist/private');

//Create service
//Route : '/api/artist/private/createservice'
//Method : POST
//Body : {serviceName,amount,description}
//Params : N/A
//Token : Yes
router.post('/createservice',protectArtist,createService);

//Update service
//Route : '/api/artist/private/updateservice'
//Method : PUT
//Body : {serviceName,amount,description}
//Params : serviceId
//Token : Yes
router.put('/updateservice/:serviceId',protectArtist,updateService);

//Get own services
//Route : '/api/artist/private/ownservices'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/ownservices',protectArtist,getOwnServices);

module.exports=router;