var Goal = require('./goalModel');

Goal.find({}, function(err, result) {
    if(err) {
        throw err;
    }

    if(result.length === 0) {
        Goal.collection.insert([
            {name: "Business case", points: 2, summary: "Create a business case", description:" write a business case and publish it in a renoun magazine or linkedin group"},
            {name: "Event", points: 3, summary: "Organize an event", description: "organize an event that promotes our company"},
            {name: "Conference", points: 5, summary: "Be a speaker in a conference", description: "Speak in a tech conference about a technology the is being used in our company"}
        ]);
    }
});
