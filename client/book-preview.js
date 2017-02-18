import Books from '/collection/schema.js';

Template.bookPreview.helpers({
    booksCollection () {
        return Books;
    },
    bookDocument () {
        return Books.findOne();
    }
});