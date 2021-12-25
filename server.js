const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');

require('./db/conn');

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));

app.use(cors());
app.use(morgan("dev"));

const port=process.env.PORT || 8000;

//User's routes
app.use('/api/user/public',require('./routes/user/public'))

//Artist's routes
app.use('/api/artist/public',require('./routes/artist/public'));
app.use('/api/artist/private',require('./routes/artist/private'));

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})