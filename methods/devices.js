Meteor.methods({
  addDevice: function (device) {
    check(device, {name: String});

    if (!Meteor.userId()) {
      //throw new Meteor.Error("not-authorized");
    }
    console.log('Add device:', device);
    Devices.insert({
      name: device.name,
      lastChangedAt: new Date(),
      owner: Meteor.userId()
    });
  },

  renameDevice: function(id, name){
    check(id, String);
    check(name, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Devices.update(id, { $set: { name: name} });
  },

  listDevices: function(type){
    check(type, String);

    if (!Meteor.userId()) {
      //throw new Meteor.Error("not-authorized");
    }
    var devices = Devices.find();
    console.log('pages!!!',devices);
    return devices;
  }

});
