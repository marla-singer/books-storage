import { Mongo } from 'meteor/mongo';

const Books = new Mongo.Collection('Books');

Books.schema = new SimpleSchema({
  details: {
    type: Object,
    optional: true,
  },
  'details.title': {
    type: String,
  },
  'details.author': {
    type: String,
  },
  'details.description': {
    type: String,
    optional: true,
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
    label: 'Информация о читателе',
    type: [Object],
    optional: true,
    defaultValue: []
  },
  'read_information.$.date': {
    label: 'Дата прочтения',
    type: String,
    optional: true,
  },
  'read_information.$.person': {
    label: 'Кто читал',
    type: String,
    optional: true,
    allowedValues: ['Дарья', 'Наталья'],
  },
  'read_information.$.rating': {
    label: 'Личный рейтинг',
    type: String,
    optional: true,
  },
  additional_info: {
    label: 'Дополнительная информация о книге',
    type: Object,
    optional: true
  },
  'additional_info.purchase_data': {
    type: String,
    optional: true,
  },
  'additional_info.owner': {
    type: String,
    optional: true,
  },
  'additional_info.tags': {
    type: [String],
    optional: true
  },
  'additional_info.unhaul_book': {
    label: 'Убрала книгу из коллекции',
    type: Boolean,
    optional: true,
    defaultValue: false
}
});

Books.attachSchema(Books.schema);

export default Books;
