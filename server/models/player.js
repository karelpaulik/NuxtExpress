const { Query } = require("mongoose");
const mongoose = require("mongoose");
const fs = require('fs');

const playerSchema = new mongoose.Schema({
    fName: String,
    lName: {
        type: String,
        // required: true,
        // default: ''
        //když zadám "required: true", měl bych zadat i default pro případ, když by ho někdo nezadal.
        //Když zadáno "required + default", pak pozor:
        //1. Pokud klient atirbut neposílá, nastaví se default
        //2. Pokud klient atribut pošle s hotnotou "null", tak vyskočí chyba
    },
    age: {
        type: Number,
        // set: (v) => {   //když definuji seter, měl by setter končit: return ...
        //     if (v == 'null') {
        //         v=0;
        //     }
        //     return Number(v);
        // }
    },
    richText: String,
    isActive: Boolean, //{type: Boolean, required: true, default: false},
    city: [String],
    prefColor: String,
    prefShape: String,
    files: [{type: mongoose.Schema.Types.ObjectId, ref: 'PlayerFile'}]
}, {});
//playerSchema.set('validateBeforeSave', false);  //toto vypne validaci

playerSchema.pre('validate', function(next) {
    console.log('playerSchema.pre');
    // console.log(this);
    // console.log(typeof(this.age));
    // console.log(this.age);
    // if (this.age ==0) {
    //     this.age = null;
    // }
    console.log(this);
    console.log(this.age);
    // if (!isNaN(this.age)) {
    //     this.age=Number(this.age)
    // }
    //console.log(this);
    next();   
});

//findById  - nemá middleware
//deleteOne                     //Zde funguje: {document: true, query: false}
//findOne
//playerSchema.pre('deleteOne', {document: true, query: false}, function(next) {        //OK
//playerSchema.pre('findOne', {document: true, query: false}, function(next) {            //NOK
//playerSchema.post('findOne', function(next) {
playerSchema.pre('findOne', async function(next) {          //fineOne: this má referenci na Query, ne na dokument. Níže ukázka, jak dostat ref. na dokument.
    // console.log('playerSchema.pre');
    // console.log(typeof this);
    // console.log(this instanceof Query);
    // console.log(this.constructor.name);     //Čeho to je instance
    // const p = await this.model.find(this.getQuery());       //Nemůžu např. uvnitř "playerSchema.pre('findOne')" použít "findOne", protože pak vznikně nekonečná smyčka!!!!
    // console.log(p);
    // next();   
});

playerSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
    console.log('deleteOne------------------');
    console.log(this);

    //TOTO FUNGUJE, ALE NA CELKEM DOST ŘÁDKŮ
    for (let file of this.files) {
        //1. možnost
        let f = await PlayerFile.findById(file);
        await f.deleteOne();                  //Buď     //middleware: document middleware
        // await PlayerFile.deleteOne({ _id: file });    //Nebo (funguje obojí) //Pozor, middleware: query middleware

        //2. možnost
        //await PlayerFile.findByIdAndDelete(file);         //Taky funguje

    }

    //3. možnost - FUNGUJE, A JE JEN NA JEDNOM ŘÁDKU
    //await PlayerFile.deleteMany({ _id: this.files});

    //KTEROU METODU VYBRAT:
    //První metoda (Document middleware) má velkou výhodu i když je zde na více řádků:
    //Totiž "Document middleware" vrací objekt, tj. v tomto případě document "file". Tzn. Zde zde mám i atribut "path", který potřebuji pro smazání souboru.
    //Druhá a třetí metoda "Query middleware" vrací query. Tudíž přes "this.getFilter()" se dostanu na "id" jednotlivých souborů, ale ne na "path". "path" je nutno v dalším kroku vyhledata.

    next();
});

    playerSchema.pre('findOneAndUpdate', {document: false, query: true}, async function(next) {
    console.log('findOneAndUpdate------------------');
    //console.log("this: ", this);
    console.log("this.getUpdate: ", this.getUpdate());
    console.log("this.getFilter: ", this.getFilter());
    console.log("this.getQuery: ", this.getQuery());
    console.log("this.getOptions: ", this.getOptions());
    console.log("this.getPopulatedPaths: ", this.getPopulatedPaths());
    console.log("this.model: ", this.model());
    console.log("----------------------------------------------");

    // // Original
    const filter = this.getFilter(); // Retrieve the query object
    const orig = await this.model.findOne(filter).populate('files').exec();
    console.log("orig: ", orig);
    
    //Update
    const update = this.getUpdate();
    console.log("update: ", update);

    // // Compare original document with updated document
    // const modifiedFields = [];
    // for (const key in update) {
    //     if (orig.files[key] !== update.files[key]) {
    //         modifiedFields.push(key);
    //     }
    // }
    // console.log('Modified fields:', modifiedFields);

    next();
});

const Player = mongoose.model('Player', playerSchema)

//-----------------------------------------------------------------

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

//Tato metoda soubory nemaže.
//Toto je zde pro ukázku, jak se pracuje s "this" uvnitř "deleteMany". Jinak než uvnitř "deleteOne".
playerFileSchema.pre('deleteMany', {document: false, query: true}, async function(next) {
    console.log('playerFileSchema - deleteMany------------------');
    console.log('getFilter---------------------')
    console.log(this.getFilter());

    for (let file of this.getFilter()._id) {
        console.log(file)
    }

    next();
});

//Tato metoda již funguje, maže soubory
playerFileSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
    console.log('playerFileSchema - deleteOne------------------');
    //console.log(this);
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

module.exports = { Player, PlayerFile }