var Collection = require('ampersand-rest-collection');
var Facet = require('./facet');

module.exports = Collection.extend({
    model: Facet,
    url : 'data/data_description.json',
    mainIndex: 'id',
    comparator: function (left, right) {
        // if (left.active  === true && right.active === false) return -1;
        // if (right.active === true && left.active  === false) return  1;

        return left.name.localeCompare(right.name);
    }
});