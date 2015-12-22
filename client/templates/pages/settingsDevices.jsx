Utils.pages.addPage('settings/devices', {
    subnavbar: false,
    tabbarWithLabels: true,
    page: {class: React.createClass({
      mixins: [ReactMeteorData],

      getMeteorData () {
        console.log('Devices!', Devices);
        return {devices: Devices.find().fetch()}
      },

      renderDevices () {
        console.log('this.data', this.data);
        var DeviceListItem = Utils.elements.getElement('deviceListItem');
        return this.data.devices.map((device) => {
            return <DeviceListItem key={device._id} page={device}/>;
          });
      },

      render () {
        return (
          <div className="page-wrapper" style={{height: 'calc(100% - 100px)', paddingTop: (Framework7.prototype.device.android===true?'72px':'0px'), paddingBottom: (Framework7.prototype.device.android===true?'55px':'0px')}}>
            <div className="page-content">
              <div className="content-block-title">Settings</div>
              <div className="content-block">
                <div className="list-block">
                  <ul>
                    {this.renderDevices()}
                  </ul>
                </div>
              </div>
            </div>
            {this.props.children}
          </div>
        );
      }
    }), props:{}},
    navbar: {class: Utils.elements.getElement('settingsNavbar'), props:{title:'Settings / Devices'}},
    toolbar: {class: Utils.elements.getElement('settingsTabbar'), props:{active:'settings/devices'}}
  });
