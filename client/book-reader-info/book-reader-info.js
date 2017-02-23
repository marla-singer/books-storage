import { Template } from 'meteor/templating';
import range from 'lodash.range';
import Books from '/collection/schema';

Template.bookReaderInformation.onCreated(function () {
  this.readerList = new ReactiveVar();
  // Get ID of current book
  const bookId = this.data.book ? this.data.book._id : '';

  this.autorun(() => {
    this.subscribe('bookReadInformation', bookId);
    // Get fresh data of current book
    const currentBook = Books.findOne(bookId) || {};
    // Set list of book readers
    this.readerList.set(currentBook.read_information);
  })
});

Template.bookReaderInformation.helpers({
  ratingSet () {
    // Auto generate rating from 0 to 10 with step 1
    return range(1, 11, 1);
  },
  readerList () {
    // TODO: Реактивно обновлять список о читателях, когда добавили новую информацию
    // const book = Template.instance().data.book;

    return Template.instance().readerList.get() || [];

    // return book ? book.read_information : [];
  },
});

Template.bookReaderInformation.events({
  'submit form': function (event, templateInstance) {
    event.preventDefault();

    // Get ID of current book
    const bookId = templateInstance.data.book._id;

    // Get value from FORM
    const values = new FormData(event.currentTarget);

    // Create Date format using selected day, month and year
    const selectedDate = new Date(values.get('set-year'), values.get('set-month'), values.get('set-day'));

    // Create object with information about reader
    const insertData = {
      person: values.get('set-reader'),
      rating: values.get('set-rating'),
      date: selectedDate.toLocaleDateString()
    };

    // Update read information in current document
    templateInstance.data.book.read_information.push(insertData);

    // Update read information in collection
    Books.update(bookId, { $push: { read_information: insertData }});
  },
});
