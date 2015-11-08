Rules = new Mongo.Collection("rules");
Adapters = new Mongo.Collection("adapters");
Devices = new Mongo.Collection("devices");
Pages = new Mongo.Collection("pages");


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });
  //
  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    //Kadira.connect('rftBtFickrCNRER5N', 'adc8359e-7304-4fe0-a9aa-7451a157a5b6');
    // code to run on server at startup
  });
}
