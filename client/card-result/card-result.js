import { Template } from 'meteor/templating';

Template.cardResult.helpers({
    // Book wasn't found
    noFound () {
        const res = Template.currentData().result;
        return res.error
    },
});

Template.cardResult.events({
    'click #save-book' () {
        const bookInformation = {};
        bookInformation.details = Template.currentData().result;

        Meteor.call('saveBook', bookInformation, (error, result) => {
            sAlert.success('Книга сохранена!')
        });
    }
});