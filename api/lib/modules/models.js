var getAllItems = function(Model, callback) {
    Model.find({}, callback);
};

var getById = function(Model, callback) {
    Model.findOne({'_id': Model._id}, callback);
};

module.exports = {
    getAllItems: getAllItems,
    getById: getById
};
