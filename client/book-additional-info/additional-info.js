Template.bookAdditionalInformation.helpers({
  setPurchaseData () {
    const checkValue = Template.instance().setPurchaseData;

    return !!(checkValue && checkValue.get());
  }
});

Template.bookAdditionalInformation.events({
  'change [name=set-putchase-data]' (event, templateInstance) {
    const checkedValue = event.currentTarget.checked;

    // If reactive var doesn't exist then create it
    if (templateInstance.setPurchaseData === undefined) {
      templateInstance.setPurchaseData = new ReactiveVar(false);
    }
    // Set value
    templateInstance.setPurchaseData.set(checkedValue);
  },
  'click button[name="book-tag"]' (event, templateInstance) {
    event.currentTarget.classList.toggle('active');
  }
});
