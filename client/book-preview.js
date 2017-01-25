import Books from '/collection/schema.js';

Template.bookPreview.helpers({
    booksCollection () {
        return Books;
    },
    bookDocument () {
        return Books.findOne();
    }
})

Template.bookPreview.onRendered(function () {
    //TODO: datepicker correct wor
    $( "#read-date" ).datepicker({
        dateFormat: "yy-mm-dd"
    });
});