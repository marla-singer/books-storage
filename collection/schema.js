import { Mongo } from 'meteor/mongo';

const Books = new Mongo.Collection('books');

Books.schema = new SimpleSchema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String,
        optional: true,
    },
    publisher: {
        type: String,
        optional: true,
    },
    year: {
        type: String,
        optional: true,
    },
    rating: {
        type: String,
        optional: true,
    },
    isbn: {
        type: String,
        optional: true,
    },
    link: {
        type: String,
        optional: true,
    },
    img: {
        type: String,
        optional: true,
    },
});

export default Books;