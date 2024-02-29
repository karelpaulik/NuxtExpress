module.exports = function(app, User, bcrypt) {

//----------Authentification------------------------------------------------------------------------
// app.post('/api/auth', (req, res) => {
//     //if (req.body.user == 'petr' && req.body.psw == 'heslo') {
//     console.log("login");
//     console.log(req.body);
//     if (req.body.user == 'petr' && bcrypt.compareSync(req.body.psw, hashPassword)) {
//         req.session.user = req.body.user
//         req.session.save(function (err) {
//             if (err) return next(err)
//             //res.redirect('/')
//             res.send(`Uživatel ${req.session.user} přihlášen.`)
//         })
//     } else {
//         res.send('Uživatel neexistuje, nebo špatné heslo.');
//     }
// });

app.post('/api/auth', async(req, res) => {
    console.log("login");

    const u = await User.findOne({email: req.body.email});
    if (!u) {
        res.status(401).send("uživatel neexistuje");
        return
    }

    //Následující krok je nutný, abych očistil "_id". Pokud bych nekládal _id, tak pak toto není potřeba.
    //_id: new ObjectId('65c38c51fa9ae79692d4a930')
    //_id: '65c38c51fa9ae79692d4a930'
    const cleanDefnUser = JSON.parse(JSON.stringify(u));
    const sessionUser = {};
    sessionUser._id = cleanDefnUser._id;
    sessionUser.email = cleanDefnUser.email;
    sessionUser.isAdmin = cleanDefnUser.isAdmin;

    if (bcrypt.compareSync(req.body.password, u.passwordHash))  {
        //req.session.email = req.body.email
        req.session.user = sessionUser;
        req.session.save(function (err) {
            if (err) return next(err)
            //res.redirect('/')
            //res.status(200).send(`Uživatel ${req.session.user.email} přihlášen.`)
            res.status(200).send(req.session.user)
        })
    } else {
        res.status(401).send('Špatné heslo.');
    }
});

app.delete('/api/auth', (req, res) => {
    let email = "";
    if (req.session.user) {
        email = req.session.user.email;
    }
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send("Nastala chyba při mazání session");
            //return;
        }
        if (email) {
            res.send(`Uživatel ${email} odhlášen`);
        } else {
            res.send("Uživatel nebyl přihášen");
        }
    })
});

app.get('/api/auth', (req, res) => {
    console.log("loged user info");
    if (req.session.user) {
        res.status(200).send(req.session.user);        
    } else {
        res.status(401).send('User not logged in.');
    }    
});

}