Utils.elements.addElement('settingsTabbar', React.createClass({
      renderSettingsTabButtons () {
        var tabBtns = [
          {label:'Users', page:'settings/users', iOSicon:'ion-ios-people-outline', androidIcon:'ion-person-stalker'},
          {label:'Devices', page:'settings/devices', iOSicon:'ion-ios-lightbulb-outline', androidIcon:'ion-lightbulb'},
          {label:'Pages', page:'settings/pages', iOSicon:'ion-ios-copy-outline', androidIcon:'ion-android-document'},
          {label:'Rules', page:'settings/rules', iOSicon:'ion-ios-color-wand-outline', androidIcon:'ion-wand'},
          {label:'Options', page:'settings/options', iOSicon:'ion-ios-settings', androidIcon:'ion-android-options'}
        ];


        return tabBtns.map((tab) => {
            return <a key={tab.page} data-page={tab.page} data-view="mainView" data-anim="false" className={this.props.active==tab.page?'tab-link active':'tab-link'}><i className={Framework7.prototype.device.android===true?tab.androidIcon+' ionicons':tab.iOSicon+' ionicons'}></i><span className="tabbar-label">{tab.label}</span></a>
          });
      },



      render () {
        return (
            <div className="toolbar tabbar tabbar-labels">
              <div className="toolbar-inner">
                  {this.renderSettingsTabButtons()}
              </div>
            </div>
        );
      }
  })
);
