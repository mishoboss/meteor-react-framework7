Meteor.methods({
  addUser: function(data) {
    var userId = Accounts.createUser({
      username: data.username,
      password: data.password,
      profile: data.profile
    });



      //Roles.addUsersToRoles(result, data.role);

    return userId;
  },

  changeUserPermission: function(id, profile){
    Meteor.users.update(id, {$set: {"profile.name": profile}});
  },

  removeUser: function (id) {
    check(id, String);
    Meteor.users.remove({_id: id});

  },
});
