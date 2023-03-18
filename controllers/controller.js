/**
* base controller file
*/

//Dependencies                                                                                    
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { JWT_SECRET } = process.env;



const errorHnadler = function (err) {
    var errors = { email: '', password: '' }
    console.log(err._message)
    if (err.message === "Invalid password") {
        errors.password = err.message

    }
    if (err.message === "Email not found") {
        errors.email = err.message

    }

    if (err.code === 11000) {
        errors.email = "user with same email exist already"
        return errors;
    }
    if (err._message) {
        if (err._message.includes("users validation failed")) {
            Object.values(err.errors).forEach(({ properties }) => {
                errors[properties.path] = properties.message
            })
        }
    }

    return errors

}
const maxAge = 1000 * 60 * 60 * 12;

const createToken = function (_id) {
    var token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: maxAge })
    return token;
}


module.exports.home_get = function (req, res) {
    //render view
    res.render('home')
}


module.exports.login_get = function (req, res) {
    //render view
    res.render('login')
}

module.exports.register_get = function (req, res) {
    //render view
    res.render('register')
}

module.exports.register_post = async function (req, res) {

    try {
        var { email, password } = req.body;
        const user = await User.create({ email: email, password: password })
        const token = createToken(user._id)
        res.cookie("jwt", token, { maxAge: maxAge, httpOnly: true })
        res.status(201).json({ user: user._id })
    } catch (err) {
        console.log(err)
        const errors = errorHnadler(err)
        res.status(401).json({ errors })

    }

}

module.exports.login_post = async function (req, res) {
    try {
        var { email, password } = req.body;
        var user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie("jwt", token, { maxAge: maxAge, httpOnly: true })
        res.status(201).json({ user: user._id })


    } catch (err) {
        console.log(err)
        var errors = errorHnadler(err)
        res.status(400).json({ errors })

    }
}


module.exports.logout = function (req, res) {
    res.cookie("jwt", '', { maxAge: 1000 })
    res.redirect('/')

}

module.exports.dahbord = (req, res)=>{
    res.render('dashbord')

}

