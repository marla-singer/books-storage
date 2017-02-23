import Books from '/collection/schema.js';

Meteor.publish('allBooks', function () {
  return Books.find();
});

Meteor.publish('bookReadInformation', function (bookId) {
  return Books.find(bookId, {
    fields: {
      read_information: 1,
    }
  });
});

Meteor.publish('bookAddInformation', function (bookId) {
  return Books.find(bookId, {
    fields: {
      additional_info: 1,
    }
  });
});

