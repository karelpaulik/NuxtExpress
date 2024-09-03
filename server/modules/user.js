module.exports = function(app) {

    const bcryptjs = require('bcryptjs'); //bcrypt -> bcryptjs?. With 'bcrypt' must be used further config inside package.json 
    const { User } = require('../models/modelsMongoose.js');

    app.post('/api/user', async(req, res) => {
        //Pozor, pokud je ve schématu definováno: "unique: true", pak nestačí: const p = await User.create(req.body);
        //Nutno použít: Model.init (kde model je název konkr. objektu)
        await User.init()
            .then( async() => {
                const p = await User.create({
                    email: req.body.email,
                    passwordHash: bcryptjs.hashSync(req.body.password, 10),
                    isAdmin: req.body.isAdmin
                });
                //const p = await User.create(req.body);
                res.send(req.body);
                })
            .catch( (err) => {
                res.send(err.message);
            });
    });
    
    app.get('/api/user', async(req, res) => {
        const u = await User.find();
        //console.log(u);
        res.send(u);
    });
    
    app.delete('/api/user', async(req, res) => {
        console.log("del all users");
        await User.deleteMany();
    });
    
    app.delete('/api/user/:id', async(req, res) => {
        console.log("del spec user");
        const u = await User.findById(req.params.id).exec();
        await u.deleteOne();
        res.send(u);
    });
}