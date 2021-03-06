var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/nodeauth')

var bcrypt = require('bcryptjs');

// var db = mongoose.connection 

//user schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    image: {
        type: String
    }
})

var User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback)
}

module.exports.getUserByUsername = (username, callback) => {
    query = { username }
    User.findOne(query, callback)
}

module.exports.comparePasswords = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, function (err, res) {
        if (err) {
            callback(err)
        } else {
            callback(null, true)
        }
    });
}

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash
            newUser.save(callback)
        });
    });
}