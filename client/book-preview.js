import Books from '/collection/schema';

Template.bookPreview.helpers({
  booksCollection () {
    return Books;
  },
  bookDocument () {
    return Books.findOne();
  },
});
