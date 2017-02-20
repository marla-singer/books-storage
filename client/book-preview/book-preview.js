// TODO: подключить библеотку momentjs
import { Template } from 'meteor/templating';

import Books from '/collection/schema';

Template.bookPreview.helpers({
  ratingSet () {
    // Auto generate rating from 0 to 10 with step 1
    return range(1, 11, 1);
  },
  readerList () {
    // TODO: Реактивно обновлять список о читателях, когда добавили новую информацию
    const book = Template.instance().data.book;

    return book ? book.read_information : [];
  }
});

Template.bookPreview.events({
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
      date: selectedDate
    };

    // Update read information in current document
    templateInstance.data.book.read_information.push(insertData);

    // Update read information in collection
    Books.update(bookId, { $push: { read_information: insertData }});
  },
});
