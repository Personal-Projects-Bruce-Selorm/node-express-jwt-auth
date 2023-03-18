/**
 * base file for  custom middlewares
 */

//Dependencies
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { JWT_SECRET } = process.env;

//middleware container 
var middleware = {};


//auth middleware
middleware.auth = async function (req, res, next) {

    //get auth available token  from the cookie
    console.log(req.cookies)
    var token = req.cookies.jwt;

    //verify token 
   await  jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
        if (!err && decodedToken) {
            console.log(decodedToken)
            next();
        } else {
            console.log(err)
            res.redirect('/login')
        }
    })
}

module.exports = middleware