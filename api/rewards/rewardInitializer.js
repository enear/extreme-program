var Reward = require('./rewardModel');

Reward.find({}, function(err, result) {
    if(err){
        throw err;
    }

    if(result.length === 0) {
        Reward.collection.insert([
            {name: "Toaster", points: 10, description: "This is a toaster", createdBy: "user", created: new Date()},
            {name: "Car", points: 500, description: "This is a brand new car", createdBy:"user", created: new Date()},
            {name: "Beach House", points: 1000500, description: "This is a brand new house in the beach", createdBy: "user", created: new Date()}
        ]);
    }
});
