require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
//const bcryptjs = require('bcryptjs'); //bcrypt -> bcryptjs?. With 'bcrypt' must be used further config inside package.json 

const app = express();
const port = 5000;                  //Takto port nastavený natvrdo.
//const port = process.env.PORT;    //Tímto vezmu port z "ecosystem.config.js"

//const { User, Player, File } = require('./models/modelsMongoose.js');

//Pozn. origin - zde musí být uvedeno i číslo portu.
var corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//   const multer = require('multer');
//   const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//       },
//       filename: function (req, file, cb) {
//         cb(null, Date.now() + '_' + file.originalname)
//       }
//     })
//   const upload = multer({ storage: storage })

app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
    secret: 'secret string',
    resave: false,
    saveUninitialized: false
}));

app.use('/uploads', express.static('uploads')); //Použití: http://localhost:5000/uploads/1.png  //app.use(express.static('uploads')); Použití: http://localhost:5000/1.png

//-----------------------route handlers-----------------------------------------------------
const requireAuthHandler = async(req, res, next) => {
    const user = req.session.user;
    if (!user){
        res.status(401).send("Přihlaste se");
        return;
    }

    //Kontrola existence uživatele v databázi. Přo případ, když bych uživatele smazal, ale on byl příhlášen přes session.
    try {
        const { User } = require('./models/modelsMongoose.js');
        const u = await User.findById(user._id).exec();
        if (!u) {
            res.status(401).send("User does not exist in db");
            return;
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Error at authentication.");
        return;
    }

    next();
}

const requireAdminHandler = (req, res, next) => {
    const user = req.session.user;
    if (!user.isAdmin) {
        res.status(403).send("Admin rights required.");
        return;
    }
    next();
}

require('./modules/helpers.js')(app, requireAuthHandler, requireAdminHandler)
require('./modules/user.js')(app)
require('./modules/auth.js')(app)
require('./modules/player.js')(app, requireAuthHandler)

//Expressjs error handling
//Ošetření chyb pro "app.post('/playerFile/:id'"
//!!! - aby fungovalo, musí být umístěno za "app.post('/playerFile/:id'", může být umístěno na konci kódu
app.use((err, req, res, next) => {
    console.log(err)
    //console.log('This is the rejected field ->', err.field);
    res.status(500).send('Something broke!')
})

app.listen(port, () => {console.log(`server listening on port: ${port}`)});
