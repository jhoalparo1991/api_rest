const path = require('path');
require('dotenv').config({
    path:path.resolve(path.dirname(__dirname), '.env')
})
const express = require('express');
const morgan = require('morgan');
const { urlencoded } = require('express');

//Initialization
const app = express();

//Setting
const port = process.env.PORT || 3000;

//Initialization database
require('./database')

//Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Routes
app.use('/api/v1/user/',require('./routes/users'));

//Start server
app.listen(port, ()=>{ console.log(`Server on port ${port} running`) });


