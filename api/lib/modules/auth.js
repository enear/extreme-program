var LocalStrategy = require('passport-local').Strategy;



module.exports = {
    passport: function(passport, User) {
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
                            username: req.body.username,
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
            User.findOne({ 'email' :  email }, function(err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, {message: "User not found! Please Register first!"});

                if (!user.validPassword(password))
                    return done(null, false, {message: "User/Password incorrect!"});

                if(req.session.previousUrl === '/admin' && user.role === 'Standard') {
                    return done(null, false, {message: "User/Password incorrect!"});
                }

                return done(null, user);
            });

        }));

    },
    permission: function(UserModel) {
        return {
          std: function(req, res, next) {
              if(!req.isAuthenticated()) {
                  res.json("Access Denied!");
              }
              else {
                  next();
              }
          },
            user: function(req, res, next) {
                UserModel.findOne({'_id': req.session.passport.user}, function(err, user) {
                    if(err|| !user || user.role === 'Standard' && user._id != req.params.id) {
                        res.json("Access Denied!");
                    }
                    else {
                        next();
                    }

                });
            },
            admin: function(req, res, next) {
                UserModel.findOne({'_id': req.session.passport.user}, function(err, user) {
                    if(err|| !user || user.role === 'Standard') {
                        res.json("Access Denied!");
                    }
                    else {
                        next();
                    }

                });
            }
        };
    }

};
