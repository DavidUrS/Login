module.exports = (app, passport) => {

    app.get('/',(req,res)=>{
        res.render('index');
    });

    app.get('/login',(req,res)=>{
        res.render('login',{
            message: req.flash('LoginMessage')
        });
    });

    app.get('/signup', (req,res)=>{
        res.render('signup',{
            message: req.flash('signupMessage')
        });
    });

    app.get('/profile', isLoggedIn, (req,res)=>{
        res.render('profile',{
            user : req.user
        });
    });

    app.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });

    

    app.post('/login',passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash:true
    }));

    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash:true
        
    }));

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/');
        }
    }

    

};