Utils.pages.addPage('settings/users', {
    subnavbar: false,
    tabbarWithLabels: true,
    page: {class: React.createClass({
      mixins: [ReactMeteorData],

      statics: {
        onAddUserClick(){
          ReactDOM.render(
            <div className="popup popup-new-user">
            <div className="content-block">
              <div className="content-block-title">Add a new User</div>

              <div className="list-block">
                <ul>
                  <li>
                    <div className="item-content">
                      <div className="item-inner">
                        <div className="item-title label">Name</div>
                        <div className="item-input">
                          <input name="username" type="text" placeholder="Name" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item-content">
                      <div className="item-inner">
                        <div className="item-title label">Password</div>
                        <div className="item-input">
                          <input name="password" type="password" placeholder="Password" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item-content">
                      <div className="item-inner">
                        <div className="item-title label">Repeat Password</div>
                        <div className="item-input">
                          <input name="rpassword" type="password" placeholder="Repeat Password" />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <a href="#" onClick={this.addUser} className="button button-big button-fill">Add User</a>
              <a href="#" style={{margin: '20px auto', display: 'block', width: '120px', textAlign: 'center'}} className="close-popup">Close</a>


            </div>
          </div>
          , document.getElementById("react-popups"));
          Utils.refs.f7.popup('.popup-new-user');
        },
      },

      onChangePermission (event){
        var me = this,
            profile = event.target.value;
        Meteor.call('changeUserPermission', this.editedUserData._id, profile, function(err) {
          if (err) {
            Utils.refs.f7.alert(err, 'Error!');
          } else {
            console.log('event.target.value', profile)
            me.editedUserData.profile.name = profile;
            //this.setState({editData.profile: event.target.value});
          }
        });

      },

      onEditUserClick (user_id) {
        var userData = null;
        for(var i=0; i < this.data.users.length; i++){
          if(this.data.users[i]._id == user_id){
            userData = this.data.users[i];
            break;
          }
        }
        this.editedUserData = userData;
        if(userData){
          ReactDOM.render(
            <div className="popup popup-edit-user">
            <div className="content-block">
              <div className="content-block-title">Edit &quot;{userData.username}&quot;</div>

              <div className="list-block">
                <ul>
                  <li>
                    <div className="item-content">
                      <div className="item-inner">
                        <div className="item-title label">Name</div>
                        <div className="item-input">
                          <input name="username" defaultValue={userData.username} type="text" placeholder="Name" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item-content">
                      <div className="item-inner">
                        <div className="item-title label">Permission</div>
                        <div className="item-input">
                          {userData.profile.name}
                          <select onChange={this.onChangePermission} value={userData.profile.name} name="profile">
                            <option value="canview">Can View</option>
                            <option value="canedit">Can Edit</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item-content">
                      <div className="item-inner">
                        <div className="item-title label">Password</div>
                        <div className="item-input">
                          <input name="password" type="password" placeholder="Password" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item-content">
                      <div className="item-inner">
                        <div className="item-title label">Repeat Password</div>
                        <div className="item-input">
                          <input name="rpassword" type="password" placeholder="Repeat Password" />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <a href="#" onClick={this.addUser} className="button button-big button-fill">Add User</a>
              <a href="#" style={{margin: '20px auto', display: 'block', width: '120px', textAlign: 'center'}} className="close-popup">Close</a>


            </div>
          </div>
          , document.getElementById("react-popups"));
          Utils.refs.f7.popup('.popup-edit-user');
        }
      },

      getMeteorData () {
        return {users: Meteor.users.find({}).fetch()}
      },

      mountPopups(){

      },

      componentDidMount() {
        var me = this;
        me.mountPopups();
        $$(ReactDOM.findDOMNode(me)).find('.swipeout').on('deleted', function (e) {
          console.log('Item removed', e);
        });
        $$(ReactDOM.findDOMNode(me)).find('.user-delete').on('click', function (e) {
          var user_id = $$(e.target).parent().parent().data('id');
          Meteor.call('removeUser', user_id, function(err) {
            if (err) {
              Utils.refs.f7.alert(err, 'Error!');
            }
          });
        });
      },

      addUser(){
        var me = this,
            popupEl = $$('.popup-new-user'),
            data = {};

        data.username = popupEl.find('[name="username"]')[0].value;
        data.password = popupEl.find('[name="password"]')[0].value;
        data.profile = {name: 'canview'};
        var rpassword = popupEl.find('[name="rpassword"]')[0].value;

        if(!data.username){
            Utils.refs.f7.alert('Name can not be empty!', 'Alert!');
            return;
        } else if(!data.password){
            Utils.refs.f7.alert('Password can not be empty!', 'Alert!');
            return;
        } else if(data.password !== rpassword){
            Utils.refs.f7.alert('Passwords do not match!', 'Alert!');
            return;
        }

        Meteor.call('addUser', data, function(err, userId) {
          if (!err) {
            Utils.refs.f7.closeModal('.popup-new-user');
          } else {
            Utils.refs.f7.alert(err, 'Error!');
          }
        });
      },


      renderUsers () {
        return this.data.users.map((user) => {
          if(!user.emails){
            user.emails = [];
          }
          return <li key={user._id} data-id={user._id} className="list-item swipeout">
            <a href="#" onClick={this.onEditUserClick.bind(null, user._id)} className="swipeout-content item-content">
              <div className="item-inner">
                <div className="item-title">{user.username}</div>
              </div>
            </a>
            <div className="swipeout-actions-right">
              <a href="#" className="user-delete bg-red">Delete</a>
            </div>
            <div className="accordion-item-content">
              <div className="content-block inset">
                <div className="content-block-title">E-mail(s)</div>
                <div className="content-block-inner">
                {user.emails.map(function(email) {
                  return <div key={email.address}>{email.address}</div>;
                })}
              </div>
              </div>
            </div>
          </li>
          });
      },

      renderMaterialAddButton(){
        if(Utils.device.android()){
          return <a href="#" onClick={Utils.pages.callStaticMethod.bind(this, 'settings/users', 'page', 'onAddUserClick', {})} className="floating-button">
            <i className="icon icon-plus"></i>
          </a>
        } else {
          return '';
        }
      },

      render () {
        return (
          <div className="page-wrapper settings-page-wrapper">
            <div className="page-content">
              <div className="content-block-title">Users</div>
              <div className="list-block accordion-list tablet-inset">
                <ul>
                  {this.renderUsers()}
                </ul>
              </div>
            </div>
            {this.renderMaterialAddButton()}
            {this.props.children}
          </div>
        );
      }
    }), props:{}},
    navbar: {class: Utils.elements.getElement('settingsNavbar'), props:{title:'Settings / Users', right:Utils.device.android()?null:<a href="#" onClick={Utils.pages.callStaticMethod.bind(this, 'settings/users', 'page', 'onAddUserClick', {})} className="link">Add User</a>}},
    toolbar: {class: Utils.elements.getElement('settingsTabbar'), props:{active:'settings/users'}}
  });
