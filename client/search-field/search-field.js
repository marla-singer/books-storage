import { Template } from 'meteor/templating';

Template.searchField.onCreated(function () {
    const instance = this;
    // Init reactive var
    this.information = new ReactiveVar('');

    // Return state data
    // Meteor.call('returnPlaceholder', '123', (error, result) => {
    //
    //     instance.result.set(result);
    // });
});

Template.searchField.helpers({
    result() {
        return Template.instance().information.get();
    },
});

Template.searchField.events({
    'blur input' (event, instance) {
      instance.isbn = event.currentTarget.value;
    },
    'submit #find-by-isbn-form'(event, instance) {
        event.preventDefault();

        // const isbn = "9785990808355";
        // const isbn = "9785995";

        // Find book by entering isbn
        Meteor.call('findByISBN', instance.isbn, (error, result) => {
            instance.information.set(result);
        });
    },
});