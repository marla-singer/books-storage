import { Template } from 'meteor/templating';

Template.searchField.onCreated(function () {
    // Init reactive var
    this.information = new ReactiveVar('');
});

Template.searchField.helpers({
    result() {
        return Template.instance().information.get();
    },
});

Template.searchField.events({
    'submit #find-by-isbn-form'(event, instance) {
        event.preventDefault();
        // Read ISBN form input
        const isbn = instance.$('input').val();
        // Find book by entering isbn
        Meteor.call('findByISBN', isbn, (error, result) => {
            instance.information.set(result);
        });

        // Return state data
        // Meteor.call('returnPlaceholder', (error, result) => {
        //
        //     instance.information.set(result);
        // });
    },
});