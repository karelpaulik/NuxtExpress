module.exports = function(app, User, bcrypt, requireAuthHandler, requireAdminHandler) {
    app.get('/', (req, res) => {
        res.send('hello from server');
    });
    
    app.get('/public', (req, res) => {
        res.send('hello from public');
    });
    
    app.get('/private', requireAuthHandler, (req, res) => {
        res.send('hello from private');
    });
    
    app.get('/admin', requireAuthHandler, requireAdminHandler, (req, res) => {
        res.send('hello from private admin');
    });
    
    app.get('/expresslogin', (req, res) => {
            //req.session.user = "jiri"
            const sessionUser = {};
            sessionUser._id = '65c602db453857c84b1d2e72';
            sessionUser.email = "kk";
            sessionUser.isAdmin = true;
            req.session.user = sessionUser;
            req.session.save(function (err) {
                if (err) return next(err)
                //res.redirect('/')
                res.send(`Uživatel ${req.session.user} přihlášen.`)
                //res.redirect('http://localhost:3000/loginInfo')
            })
        //}
    });
    
    //List all loged users
    app.get('/logedUsers', (req, res) => {
        console.log(req.sessionStore.sessions);
        res.send(req.sessionStore.sessions);
    });
}