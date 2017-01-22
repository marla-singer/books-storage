import Books from '/collection/schema.js';

Meteor.publish('allBooks', function () {
    return Books.find();
});