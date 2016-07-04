var Reward = require('./rewardModel');

Reward.find({}, function(err, result) {
    if(err){
        throw err;
    }

    if(result.length === 0) {
        Reward.collection.insert([
            {name: "Toaster", points: 10, summary: "This is a toaster", description:"This is a brand new toaster from the X brand", createdBy: "user", created: new Date()},
            {name: "Car", points: 500, summary: "This is a brand new car", description:"This is a car, model XX, with sports kit", createdBy:"user", created: new Date()},
            {name: "Beach House", points: 1000500, summary: "This is a brand new house in the beach", description:"This is a mansion with beach view, swimming pool, and tennis court", createdBy: "user", created: new Date()}
        ]);
    }
});
