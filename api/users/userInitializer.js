var bcrypt = require('bcrypt-nodejs');
var User = require('./userModel');

User.find({}, function(err, result) {
    if(result.length === 0){
        User.collection.insert(generateTestUsers());
    }
});



function generateTestUsers() {
    var users = [
            {
                username: "Admin",
                email: "admin@test.com",
                role: "Admin",
                totalPoints: 20,
                password: bcrypt.hashSync("tester", bcrypt.genSaltSync(8), null)
            },
            {
                username: "Attributor",
                email: "attributor@test.com",
                role: "Attributor",
                totalPoints: 20,
                password: bcrypt.hashSync("tester", bcrypt.genSaltSync(8), null)
            },
            {
                username: "Approver",
                email: "approver@test.com",
                role: "Approver",
                totalPoints: 20,
                password: bcrypt.hashSync("tester", bcrypt.genSaltSync(8), null)
            }
        ];

        return users;
}
