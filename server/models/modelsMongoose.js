const { Query } = require("mongoose");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_CONNECT);

const { User } = require('./user.js')

module.exports = { User }