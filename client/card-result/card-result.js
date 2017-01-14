import { Template } from 'meteor/templating';

Template.cardResult.helpers({
    // Book wasn't found
    noFound () {
        const res = Template.currentData().result;
        return res.error
    },
});