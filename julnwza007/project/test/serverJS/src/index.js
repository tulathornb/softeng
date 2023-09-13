const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { config } = require('./config/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const Logging = require('./library/Loggin');
const userRoute = require('./Routes/auth')

const router = express();

mongoose.connect(config.mongo.url,{
    retryWrites:true
}).then(()=>{
    Logging.info('Connected to mongoDB')
    StartServer();
}).catch((error)=>{
    Logging.error('Unable to connect: ');
    Logging.error(error);
});

const StartServer = () => {
    router.use((req,res,next)=>{
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish',()=>{
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    
    router.use(cors());
    router.use(bodyParser.json())
    router.use(express.urlencoded({ extended: true}));
    router.use(express.json());
    router.use('/user',userRoute);

    router.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Header','Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method == 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

   
    router.get('/ping',(req,res,next)=>res.status(200).json({message:'ping'}));

    // Error Handling

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};