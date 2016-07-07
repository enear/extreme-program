var State = require('./requestStateModel');

State.find({}, function(err, result) {
    if(err) {
        throw err;
    }

    if(result.length === 0) {
        State.collection.insert([
            {state: "Pending"},
            {state: "Rejected"},
            {state: "Approved"}
        ]);
    }
});
