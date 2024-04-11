module.exports = function(app ) {

    // const express = require('express');
    // const cors = require('cors');
    // const fs = require('fs');
    // const app = express();
    // const port = 5000;
    
    //const { Player, PlayerFile } = require('../models/templates/modelsMongoose.js');

    const { Player, PlayerFile } = require('../models/modelsMongoose.js');
   
    const fs = require('fs');

    const folderName = 'uploads/players/';

    try {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
    } catch (err) {
    console.error(err);
    }

    const multer = require('multer');
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, folderName)
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname)
        }
      })
    const upload = multer({ storage: storage })
    
    // app.use(express.json());
    // app.use(cors());
    // app.use('/uploads', express.static('uploads')); //Použití: http://localhost:5000/uploads/1.png  //app.use(express.static('uploads')); Použití: http://localhost:5000/1.png
    
    //upload.single     tj. upload jednoho souboru
    //upload.array      tj. upload více souborů
    //upload.any()      tj. zde nevadí, když neznám jak se jmenuje parametr uvnitř "upload.array('file')" - tj. když nevím, co má být místo 'file'
    //nyní asi univerzální, ponechat "upload.array"
    //pokud nepošlu žádný soubor, pak "req.files" není undefined, ale prázdné pole, tj. []
    //funguje, i pokud na klientovi není nastaveno "multiple"
    app.post('/player', upload.array('file'), async(req, res) => {
        //console.log(req.body);    //console.log(req.file);    //console.log(req.files);
        try {
            //Pokud má req.body v sobě atribut "_id" tak ho smaž. Zde se "_id" maže jednodušeji než na klientovi.
            const x = req.body;
            delete x._id;
            const p = await Player.create(x);
            // for (let item of req.files) {
            //     const f = await PlayerFile.create(item);
            //     //await f.setPlayer(p);   //Toto je vložení vazby v sequelize
            //     await p.files.push(f._id);
            //     await p.save();
            // }
            res.send(p);
        } catch(err) {
            console.log("catch blok");
            console.log(err);
        } finally {
            console.log('finally blok')
        }
        //res.send(req.body);
    });
    
    app.get('/player', async(req, res) => {
        const p = await Player.find().populate('files').exec();
        //console.log(JSON.parse(JSON.stringify(p)));
        res.send(p);
    });
    
    app.get('/player/:id', async(req, res) => {
        //const p = await Player.findById(req.params.id);   //findById nemá middleware
        const p = await Player.findOne({_id: req.params.id}).populate('files').exec();
        res.send(p);
    });
    
    app.put('/player/:id', async(req, res) => {
        const filter = {_id: req.params.id};
        const update = req.body;
        console.log("filter: ", filter);
        console.log("update: ", update);
        const p = await Player.findOneAndUpdate(filter, update, {
            new: true
        }).populate('files').exec();
        res.send(p);
    });
    
    app.delete('/player/:id', async(req, res) => {
        const p = await Player.findById(req.params.id);
        if (p) {  
            await p.deleteOne();    //Mongoose
        }
        res.send(p);
    });
    //------------------------------------------------------------------------

    app.post('/playerFile/:id', upload.array('file'), async(req, res) => {      //zde změna oproti "/player"
        //console.log(req.body);        //console.log(req.file);        //console.log(req.files);
        try {
            //const p = await Player.create(req.body);
            const p = await Player.findOne({_id: req.params.id});               //zde změna oproti "/player"

            for (let item of req.files) {
                const f = await PlayerFile.create(item);
                //await f.setPlayer(p);   //Toto je vložení vazby v sequelize
                await p.files.push(f._id);
                await p.save();
            }
        } catch(err) {
            console.log("catch blok");
            console.log(err);
        } finally {
            console.log('finally blok')
        }
        console.log('---------------------')
        res.send(req.body);
    });

    app.get('/playerFile', async(req, res) => {
        const f = await PlayerFile.find().exec();
        res.send(f);
    });
    
    app.get('/playerFile/:id', async(req, res) => {
        const f = await PlayerFile.findOne({_id: req.params.id}).exec();
        res.send(f);
    });
    
    app.delete('/playerFile/:id', async(req, res) => {
        const f = await PlayerFile.findOne({_id: req.params.id}).exec();
        if (f) {   
            await f.deleteOne();  
        }
        res.send(f);
    });

    
}