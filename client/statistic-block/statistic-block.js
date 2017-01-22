Template.statisticBlock.helpers({
    totalBooks () {
        return Books.find().count();
    },
    readBooks () {
        return Books.find({ read_information: { $exists: true }}).count();
    },
    unreadBooks () {
        return Books.find({ read_information: { $exists: false }}).count();
    },
});