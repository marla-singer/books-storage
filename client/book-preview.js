import { Template } from 'meteor/templating';
import range from 'lodash.range';
import Books from '/collection/schema';

Template.bookPreview.helpers({
  days () {
    // Auto generate days data with step 1
    return range(1, 32, 1);
  },
  months () {
    const standardMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    const months = standardMonths.map((currentValue, index) => {
      return {
        label: currentValue,
        value: index,
        selected: null,
      };
    });

    const currentMonth = new Date().getMonth();

    // Set current month as selected by default
    months[currentMonth].selected = 'selected';

    return months;
  },
  years () {
    const currentYear = new Date().getFullYear();
    // Auto generate year data 2012-2030 with step 1
    const yearsList = range(2012, currentYear, 1);
    const years = yearsList.map((year) => {
      return {
        value: year,
        selected: '',
      };
    });

    // Set current year as selected by default
    years.push({ value: currentYear, selected: 'selected' });

    return years;
  },
  ratingSet () {
    // Auto generate rating from 0 to 10 with step 1
    return range(1, 11, 1);
  },
});

Template.bookPreview.events({
  'submit form': function (event, templateInstance) {
    event.preventDefault();

    // Get ID of current book
    const bookId = templateInstance.data.currentBook._id;

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

    // Insert in collection
    Books.update(bookId, { $push: { read_information: insertData }});
  },
});
