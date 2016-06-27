var Goal = require('./goalModel');

Goal.find({}, function(err, result) {
    if(err) {
        throw err;
    }

    if(result.length === 0) {
        Goal.collection.insert([
            {name: "Business case", points: 2, description: "Create a business case"},
            {name: "Event", points: 3, description: "Organize an event"},
            {name: "Conference", points: 5, description: "Be a speaker in a conference"}
        ]);
    }
});
