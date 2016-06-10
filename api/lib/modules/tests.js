var chai = require('chai');
var should = chai.should();

var testRequiredFields = function(item, requiredProperties) {
    requiredProperties.forEach(function(property) {
        item.should.have.property(property);
    });
};

module.exports = {
    testRequiredFields: testRequiredFields
};
