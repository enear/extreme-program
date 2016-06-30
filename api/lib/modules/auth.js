var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, User) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
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

                }
            });
        });
    }));
};
