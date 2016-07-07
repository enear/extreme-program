var LocalStrategy = require('passport-local').Strategy;



module.exports = function(passport, User) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'email': email}, function(err, user) {
                if(err){
                    return done(err);
                }

                if(user){
                    return done(null, user);
                }
                else {

                    var newUser = new User({
                        username: email,
                        email: email,
                        points: 0,
                        role: "Standard"
                    });

                    newUser.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if(err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });

                }
            });
        });
    }));

    passport.use('login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    },
    function(req, email, password, done) {
        //TODO: improve this ASAP
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, {message: "User/Password incorrect!"});

            if (!user.validPassword(password))
                return done(null, false, {message: "User/Password incorrect!"});

            if(req.session.returnTo === '/admin' && user.role === 'Standard') {
                return done(null, false, {message: "User/Password incorrect!"});
            }

            return done(null, user);
        });

    }));
};
