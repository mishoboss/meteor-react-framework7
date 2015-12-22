Utils.pages.addPage('settings/pages', {
    subnavbar: false,
    tabbarWithLabels: true,
    page: {class: React.createClass({
      mixins: [ReactMeteorData],

      statics: {
        onAddUserClick(){
          Utils.refs.f7.popup('.popup-add-edit-page');
        },
      },

      getMeteorData () {
        return {pages: Pages.find({}).fetch()}
      },

      mountPopups(data){
        var title;

        if(data){
          title = 'Edit '+data.type=='room'?'room':'page'+' "'+data.name+'"';
        } else {
          title = 'Add a new Page';
        }
        ReactDOM.render(<div className="popup popup-add-edit-page">
          <div className="content-block">
          <div className="content-block-title">{title}</div>

          <div className="buttons-row">
            <a href="#popup-add-edit-rooms-tab" className="tab-link active button">Room Page</a>
            <a href="#popup-add-edit-functions-tab" className="tab-link button">Function Page</a>
          </div>

          <div className="tabs">

            <div id="popup-add-edit-rooms-tab" class="tab active">
              <div class="content-block">
                <p>This is tab 1 content</p>
                ...
              </div>
            </div>

            <div id="popup-add-edit-functions-tab" class="tab">
              <div class="content-block">
                <p>This is tab 2 content</p>
                ...
              </div>
            </div>

          </div>

            <div className="list-block">
              <ul>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title label">Name</div>
                      <div className="item-input">
                        <input name="email" type="email" placeholder="E-mail" />
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
        </div>, document.getElementById("react-popups"));
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

        data.email = popupEl.find('[name="email"]')[0].value;
        data.password = popupEl.find('[name="password"]')[0].value;
        data.profile = {name: 'user'};
        var rpassword = popupEl.find('[name="rpassword"]')[0].value;

        if(!data.email){
            Utils.refs.f7.alert('Email can not be empty!', 'Alert!');
            return;
        } else if(!data.password){
            Utils.refs.f7.alert('Password can not be empty!', 'Alert!');
            return;
        } else if(data.password !== rpassword){
            Utils.refs.f7.alert('Passwords do not match!', 'Alert!');
            return;
        }

        Meteor.call('createUser', data, function(err, userId) {
          if (!err) {
            Utils.refs.f7.closeModal('.popup-new-user');
          } else {
            Utils.refs.f7.alert(err, 'Error!');
          }
        });
      },


      renderPages () {
        //var UserItem = Utils.elements.getElement('UserItem');
        console.log('this.data.pages', this.data.pages)
        return this.data.pages.map((page) => {
          return <li key={page._id} data-id={page._id} className="accordion-item swipeout">
            <a href="#" className="swipeout-content item-content item-link">
              <div className="item-inner">
                <div className="item-title">{page.name}</div>
              </div>
            </a>
            <div className="swipeout-actions-right">
              <a href="#" className="user-delete bg-red">Delete</a>
            </div>
            <div className="accordion-item-content">
              <div className="content-block">
                BLA BLA BLA
              </div>
            </div>
          </li>
          });
      },

      renderMaterialAddButton(){
        if(Utils.device.android()){
          return <a href="#" onClick={Utils.pages.callStaticMethod.bind(this, 'settings/pages', 'page', 'onAddUserClick', {})} className="floating-button">
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
              <div className="content-block-title">Pages</div>
              <div className="list-block accordion-list tablet-inset">
                <ul>
                  {this.renderPages()}
                </ul>
              </div>
            </div>
            {this.renderMaterialAddButton()}
            {this.props.children}
          </div>
        );
      }
    }), props:{}},
    navbar: {class: Utils.elements.getElement('settingsNavbar'), props:{title:'Settings / Pages', right:Utils.device.android()?null:<a href="#" onClick={Utils.pages.callStaticMethod.bind(this, 'settings/pages', 'page', 'onAddUserClick', {})} className="link">Add User</a>}},
    toolbar: {class: Utils.elements.getElement('settingsTabbar'), props:{active:'settings/pages'}}
  });
