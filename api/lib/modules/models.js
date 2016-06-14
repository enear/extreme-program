var getAllItems = function(Model, callback) {
    Model.find({}, callback);
};

var getById = function(Model, id, callback) {
    Model.findOne({'_id': id}, callback);
};

var createNewItem = function(Model, item, callback) {
    var newItem = new Model(item);

    item.save(callback);
};

var deleteItem = function(Model, id, callback) {
    Model.findOneAndRemove({'_id': id}, callback);
};

var updateItem = function(Model, id, updates, callback) {
    Model.findOne({'_id': id}, function(err, result) {
        for(var key in updates) {
            if(result[key] !== updates[key]) {
                result[key] = updates[key];
            }
        }

        result.save(callback);
    });
};

var getRequiredFields = function(Model)  {
    var schema = Model.schema.tree;
    var requiredFields = [];

    for(var key in schema) {
        if(!schema.hasOwnProperty(key)) {
            continue;
        }

        if(schema[key].hasOwnProperty('required')) {
            if(schema[key].required === true) {
                requiredFields.push(key);
            }
        }
    }

    return requiredFields;
};


module.exports = {
    getAllItems: getAllItems,
    getById: getById,
    deleteItem: deleteItem,
    getRequiredFields: getRequiredFields,
    updateItem: updateItem
};
