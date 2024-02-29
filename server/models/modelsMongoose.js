const { Query } = require("mongoose");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_CONNECT);

const userSchema = new mongoose.Schema({
    email: {type: String, index: true, unique: true},
    passwordHash: String,
    isAdmin: Boolean
}, {});

const User = mongoose.model('User', userSchema);

module.exports = { User }