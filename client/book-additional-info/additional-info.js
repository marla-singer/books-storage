import Books from '/collection/schema';

Template.bookAdditionalInformation.onCreated(function () {
  this.additionalInfo = new ReactiveVar();
  this.setPurchaseData = new ReactiveVar(false);
  // Get ID of current book
  const bookId = this.data.book ? this.data.book._id : '';

  this.autorun(() => {
    this.subscribe('bookAddInformation', bookId);
    // Get fresh data of current book
    const currentBook = Books.findOne(bookId) || {};
    // Set list of book readers
    this.additionalInfo.set(currentBook.additional_info);
  });
});

Template.bookAdditionalInformation.helpers({
  setPurchaseData () {
    return Template.instance().setPurchaseData.get();
  },
  addInfo () {
    return Template.instance().additionalInfo.get();
  }
});

Template.bookAdditionalInformation.events({
  'change [name=set-putchase-data]' (event, templateInstance) {
    const checkedValue = event.currentTarget.checked;
    // Set value
    templateInstance.setPurchaseData.set(checkedValue);
  },
  'click button[name="book-tag"]' (event, templateInstance) {
    event.currentTarget.classList.toggle('active');
  }
});
