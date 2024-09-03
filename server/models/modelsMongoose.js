const { Query } = require("mongoose");
const mongoose = require("mongoose");

//mongoose.connect(process.env.MONGOOSE_CONNECT);

//Vypnutí tls:
mongoose.connect(process.env.MONGOOSE_CONNECT, {
    tls: true,
    tlsAllowInvalidCertificates: true,
});

const { User } = require('./user.js')
const { Player, PlayerFile } = require('./player.js')

module.exports = { User, Player, PlayerFile }