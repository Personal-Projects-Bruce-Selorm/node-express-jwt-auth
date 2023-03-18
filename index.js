/**
 * base filee for app
 */


//Dependencies
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require('mongoose')
const { PORT, CONNEECTION_STRING, DB_NAME } = process.env;
const path = require('path')
const router = require('./routes/routes')
const cookieParser = require('cookie-parser')
const middleware  = require('./middlewares/authMiddleware')



//initialize  express app
const app = express();

//view set up
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, "view"))


//establise db connection

const db_connect = async () => {
    try {
        await mongoose.connect(CONNEECTION_STRING, { dbName: DB_NAME, useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connection establised")
    } catch (err) {
        console.log(err)

    }
}

db_connect();

//register route as a middleware
app.use(express.json())
app.use(cookieParser())
app.use(router)




//start server
app.listen(PORT, () => { console.log(`server is up and running on port ${PORT}`); })
