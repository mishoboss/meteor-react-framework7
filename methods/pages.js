Meteor.methods({
  addPage: function (page) {
    check(page, {name: String, type: String});

    if (!Meteor.userId()) {
      //throw new Meteor.Error("not-authorized");
    }

    Pages.insert({
      name: page.name,
      createdAt: new Date(),
      owner: Meteor.userId(),
      type: page.type
    });
  },

  renamePage: function(id, name){
    check(id, String);
    check(name, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Pages.update(id, { $set: { name: name} });
  },

  listPages: function(type){
    check(type, String);

    if (!Meteor.userId()) {
      //throw new Meteor.Error("not-authorized");
    }
    var pages = Pages.find();
    console.log('pages!!!',pages);
    return pages;
  }

});
