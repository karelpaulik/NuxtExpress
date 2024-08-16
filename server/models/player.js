const { Query } = require("mongoose");
const mongoose = require("mongoose");
const fs = require('fs');
//--------------------------------------------------------------------------
const playerSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    age: Number,
    richText: String,
    isActive: Boolean,
    city: [String],
    prefColor: String,
    prefShape: String,
    files: [{type: mongoose.Schema.Types.ObjectId, ref: 'PlayerFile'}]
}, {});

playerSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
    // console.log('deleteOne...');
    // console.log(this);
    for (let file of this.files) {
        let f = await PlayerFile.findById(file);
        await f.deleteOne();                //middleware: document middleware
    }
    next();
});

const Player = mongoose.model('Player', playerSchema)
//---------------------------------------------------------------------------
const playerFileSchema = new mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: String
}, {});

//Tato metoda již funguje, maže soubory
playerFileSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
    // console.log('playerFileSchema - deleteOne...');
    // console.log(this);
    const file=this;
    if (file.path) {
        fs.unlink(file.path, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Deleted: ${file.path}`);
            }
        });
    } else {
        console.log('Path to the file does not exist')
    }
    next();
});

const PlayerFile = mongoose.model('PlayerFile', playerFileSchema)
//---------------------------------------------------------------------------
module.exports = { Player, PlayerFile }