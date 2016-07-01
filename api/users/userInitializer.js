var User = require('./userModel');

User.find({}, function(err, result) {
    if(result.length === 0){
        var newUser = new User({
            username: "tester@test.com",
            email: "tester@test.com",
            role: "standard",
            password: "tester",
            totalPoints: 20
        });

        newUser.save(function(err, result) {
            console.log(err || "User saved");
        });
    }
});
