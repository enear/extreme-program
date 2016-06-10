var User = require('./userModel');

User.find({}, function(err, result) {
    if(result.length === 0){
        var newUser = new User({
            username: "goncalo.assuncao",
            email: "goncalo.assuncao@e-near.co",
            role: "standard"
        });

        newUser.password = newUser.generateHash("123456");

        newUser.save(function(err) {
            if(err){ 
                console.log(err);
            }

            console.log("User saved");
        });
    }
});
