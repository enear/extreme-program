var LocalStrategy = require('passport-local').Strategy;
var SlackStrategy = require('passport-slack').Strategy;


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
            function(req, email, password, done) {
                process.nextTick(function() {
                    User.findOne({ 'email': email }, function(err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (user) {
                            return done(null, user);
                        } else {

                            var newUser = new User({
                                username: req.body.username,
                                email: email,
                                points: 0,
                                role: "Standard"
                            });

                            newUser.password = newUser.generateHash(password);

                            newUser.save(function(err) {
                                if (err) {
                                    throw err;
                                }

                                return done(null, newUser);
                            });

                        }
                    });
                });
            }));

        passport.use('login', new LocalStrategy({
                passReqToCallback: true
            },
            function(req, username, password, done) {
                User.findOne({ 'username': username }, function(err, user) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }

                    console.log("here");

                    if (!user)
                        return done(null, false, { message: "User not found! Please Register first!" });

                    if (!user.validPassword(password))
                        return done(null, false, { message: "User/Password incorrect!" });

                    if (req.session.previousUrl === '/admin' && user.role === 'Standard') {
                        return done(null, false, { message: "User/Password incorrect!" });
                    }

                    return done(null, user);
                });

            }));


        passport.use('slack-login', new SlackStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URI,
            scope: process.env.SCOPE,
            team: process.env.TEAM_ID
        }, function(accessToken, refreshToken, profile, done) {
            console.log(profile);

            if (profile._json.team_id !== process.env.TEAM_ID) {
                console.log(process.env.TEAM_ID);
                return done(null, false, { message: "You must belong to Enear Slack team in order to register! Please sign out from your actual team and sign in to Enear Team." });
            } else {

            }
            User.findOne({ 'username': profile.displayName }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    var newUser = new User({
                        username: profile.displayName,
                        points: 0,
                        role: "Standard",
                        slack: {
                            accessToken: accessToken,
                            userID: profile.id
                        }
                    });


                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                } else {
                    if (!user.slack) {
                        user.slack = {
                            accessToken: accessToken,
                            userID: profile.id
                        };

                        user.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, user);
                        });

                    } else {
                        if (user.slack.accessToken === accessToken) {
                            return done(null, user);
                        }
                    }
                }
            });
        }));

    },
    permission: function(UserModel) {
        return {
            std: function(req, res, next) {
                if (!req.isAuthenticated()) {
                    res.json("Access Denied!");
                } else {
                    next();
                }
            },
            user: function(req, res, next) {
                UserModel.findOne({ '_id': req.session.passport.user }, function(err, user) {
                    if (err || !user || user.role === 'Standard' && user._id != req.params.id) {
                        res.json("Access Denied!");
                    } else {
                        next();
                    }

                });
            },
            admin: function(req, res, next) {
                UserModel.findOne({ '_id': req.session.passport.user }, function(err, user) {
                    if (err || !user || user.role === 'Standard') {
                        res.json("Access Denied!");
                    } else {
                        next();
                    }

                });
            }
        };
    }

};