import { Template } from 'meteor/templating';
import range from 'lodash.range';

Template.selectDate.helpers({
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
    years.push({value: currentYear, selected: 'selected'});

    return years;
  },
});
