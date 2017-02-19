import { Template } from 'meteor/templating';
import range from 'lodash.range';

Template.bookPreview.helpers({
    days () {
        // Auto generate days data with step 1
        return range(1,32,1);
    },
    months () {
        const standardMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        const months = standardMonths.map((currentValue, index) => {
            return {
                label: currentValue,
                value: index,
                selected: null
            }

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
        const years =  yearsList.map((year) => {
            return {
                value: year,
                selected: ''
            }
        });

        // Set current year as selected by default
        years.push({ value: currentYear, selected: 'selected'});

        return years;

    },
    ratingSet () {
        // Auto generate rating from 0 to 10 with step 1
        return range(1, 11, 1);
    }
});

Template.bookPreview.events({
    'checked [name=set-reader]' (event, templateInstance) {
      // Save reader to TI
    },
    'checked [name=set-rating]' (event, templateInstance) {
      // Save rating to TI
    },
    'click #save-reader-info' (event, templateInstance) {
        // Get book ID
        // Group together all info from template instance

        // Get info from select

        // Save information to collection
    },
    'submit form' (event, templateInstance) {
        event.preventDefault();
        const values = new FormData(event.currentTarget);

        const insertData = {
            person: values['set-reader'],
            rating: values['set-rating']
        };

        const selectedDay = new Date();

        selectedDay.setDay(values['set-day']);
        selectedDay.setMonth(values['set-month']);
        selectedDay.setYear(values['set-year']);

        values.forEach((v, k) => console.log(`${k} => ${v}`));
    }
});