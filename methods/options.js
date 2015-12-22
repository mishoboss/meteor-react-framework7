Meteor.methods({
  setOption: function (name, value) {
    var me = this;
    //check(name, {name: String, type: String});

    if (!Meteor.userId()) {
      //throw new Meteor.Error("not-authorized");
    }
    
    Options.update({ name: name }, {
      $set: {value: value}
    }, {upsert: true});
  }

});
