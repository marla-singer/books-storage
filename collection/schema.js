import { Mongo } from 'meteor/mongo';

const Books = new Mongo.Collection('Books');

Books.schema = new SimpleSchema({
    details: {
        type: Object,
        optional: true
    },
    'details.title': {
        type: String
    },
    'details.author': {
        type: String
    },
    'details.description': {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    'details.publisher': {
        type: String,
        optional: true,
    },
    'details.year': {
        type: String,
        optional: true,
    },
    'details.rating': {
        type: String,
        optional: true,
    },
    'details.isbn': {
        type: String,
        optional: true,
    },
    'details.link': {
        type: String,
        optional: true,
    },
    'details.img': {
        type: String,
        optional: true,
    },
    read_information: {
        type: [Object],
        optional: true,
    },
    'read_information.data': {
        type: String,
        optional: true,
    },
    'read_information.person': {
        type: String,
        optional: true
    },
    purchase_data: {
        type: String,
        optional: true,
    },
    owner: {
        type: String,
        optional: true
    },
});

Books.attachSchema(Books.schema);

export default Books;