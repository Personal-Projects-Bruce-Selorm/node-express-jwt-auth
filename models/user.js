/**
 * base file for user module
 */

//Dependencies
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')



//define user scheme
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "this is not a valid email"]
    },
    password: {
        type: String,
        required: [true, "The password fild is required"],
        minLength: [6, "minimun password length is 6"],

    }
})

//create index
userSchema.index({ email: 1 })
//hash user password before saving to db
userSchema.pre("save", async function (next) {

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();

})


//create static login function on schema
userSchema.statics.login = async function (email, password) {
    // get user with email
    var user = await User.findOne({ email: email });

    if (user) {
        //check password
        var result = await bcrypt.compare(password, user.password)

        if (result) {
            return user;

        } else {
            throw Error("Invalid password")
        }

    } else {
        throw Error("Email not found")
    }
}
//create user model

const User = mongoose.model('users', userSchema);




module.exports = User;