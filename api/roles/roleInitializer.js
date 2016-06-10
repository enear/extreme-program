var Role = require('./roleModel');

Role.find({}, function(err, result) {
    if(err) {
        throw err;
    }

    if(result.length === 0) {
        Role.collection.insert([
            {role: "Standard"},
            {role: "Attributor"},
            {role: "Approver"},
            {role: "Admin"}
        ]);
    }
});
