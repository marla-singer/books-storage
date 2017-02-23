import Books from '/collection/schema.js';

Template.bookCatalog.onCreated(function () {
  this.subscribe('allBooks');

  // Initial reactive variable
  this.selectedBook = new ReactiveVar();
});

Template.bookCatalog.helpers({
  bookList () {
    return Books.find().fetch();
  },
  currentBook () {
    const selectedBook = Template.instance().selectedBook.get();

    // If book was selected then return book details otherwise doesn't show template
    return selectedBook ? selectedBook : undefined;
  },
});

Template.bookCatalog.events({
  'click tr': (event, templateInstance) => {
    // Get ID of selected book form data-id attribute
    const bookId = event.currentTarget.dataset.id;
    // Get related document from collection by ID
    const book = Books.findOne(bookId);

    // Save selected book in template instance
    templateInstance.selectedBook.set(book);
  },
});

