Meteor.startup(function () {
  if (Pages.find().count() === 0) {
    Meteor.call("addPage", {name:'Test Page 1', type:'room'});
    Meteor.call("addPage", {name:'Test Page 2', type:'room'});
    Meteor.call("addPage", {name:'Test Page 3', type:'room'});
  }


  if (Devices.find().count() === 0) {
    Meteor.call("addDevice", {name:'Kitchen Lamp'});
    Meteor.call("addDevice", {name:'Living TV'});
    Meteor.call("addDevice", {name:'Bedroom Heating'});
  }


  Meteor.publish("devices", function () {
    if (true) {
      return Devices.find();
    } else {
      // Declare that no data is being published. If you leave this line
      // out, Meteor will never consider the subscription ready because
      // it thinks you're using the added/changed/removed interface where
      // you have to explicitly call this.ready().
      return [];
    }
  });

  Meteor.publish("pages", function () {
    if (true) {
      return Pages.find();
    } else {
      // Declare that no data is being published. If you leave this line
      // out, Meteor will never consider the subscription ready because
      // it thinks you're using the added/changed/removed interface where
      // you have to explicitly call this.ready().
      return [];
    }
  });

  Meteor.publish("options", function () {
    if (true) {
      return Options.find();
    } else {
      // Declare that no data is being published. If you leave this line
      // out, Meteor will never consider the subscription ready because
      // it thinks you're using the added/changed/removed interface where
      // you have to explicitly call this.ready().
      return [];
    }
  });

  Meteor.publish("users", function () {
      return Meteor.users.find({});
  });


});
