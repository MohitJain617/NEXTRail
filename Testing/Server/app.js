const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//create
app.post('/insert',(req,res) =>{

});

//read
app.get('/getAll', (req,res) =>{
    const db = dbService.getDbServiceInstance();
    
})

//update

//delete


app.listen(process.env.PORT, () => console.log('app is running'));



/*
npm i express
npm i --save-dev nodemon

app.listen(8001) - listen to port 8001


*/