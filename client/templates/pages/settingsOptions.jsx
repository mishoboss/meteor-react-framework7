Utils.pages.addPage('settings/options', {
    subnavbar: false,
    tabbarWithLabels: true,
    page: {class: React.createClass({
      mixins: [ReactMeteorData],

      getMeteorData () {
        return {
          options: Options.find({}).fetch(),
          bridges: Bridges.find({}).fetch(),
          loaded: GoogleMaps.loaded(),
          mapOptions: GoogleMaps.loaded() && this._mapOptions()
        }
      },

      renderBridges () {
        var PageMenuItem = Utils.elements.getElement('pageMenuItem');
        return this.data.bridges.map((bridge) => {
            var badgeClasses = classNames({
              'badge': true,
              'bg-green': bridge.enabled,
              'bg-red': !bridge.enabled
            });
            return <li key={bridge._id} className="accordion-item"><a href="#" className="item-content item-link">
                <div className="item-inner">
                  <div className="item-title">{bridge.name}</div>
                  <div className="item-after">
                    <span className={badgeClasses}>{bridge.enabled?'enabled':'disabled'}</span>
                  </div>
                </div></a>
              <div className="accordion-item-content">
                <div className="content-block">

                </div>
              </div>
            </li>;
          });
      },

      _mapOptions() {
        return {
          zoom: 9
        };
      },

      componentWillMount() {

      },

      componentDidMount() {
        var me = this;
        var dateTimeFormat = Utils.options.getOption('timeZone', 'LLL');
        var currentTime = moment.tz(dateTimeFormat);


          var timeZonePicker = Utils.refs.f7.picker({
              input: '#picker-datetime-format',
              rotateEffect: false,
              toolbar: true,
              //updateValuesOnTouchmove: false,
              value: [dateTimeFormat],
              toolbarCloseText: 'Close',
              formatValue: function (picker, value, displayValue) {
                return displayValue;
              },
              onClose: function(picker){
                Utils.options.setOption('dateTimeFormat', picker.value[0]);
              },
              cols: [
                {
                  textAlign: 'left',
                  values: [
                    'LLL',
                    'lll',
                    'LLLL',
                    'llll'
                  ],
                  displayValues: [
                    currentTime.format('LLL'),
                    currentTime.format('lll'),
                    currentTime.format('LLLL'),
                    currentTime.format('llll')
                  ]
                }
              ]
          });


      },

      setLocation(location){
        var me = this;
        Utils.options.setOption('location', location);
      },

      setTheme(themeData){
        var me = this;
        $$('body')[0].className.split(' ').map(function(className){
          if(className.indexOf('theme-') != -1){
            $$('body').removeClass(className);
          }
          if(className.indexOf('layout-') != -1){
            $$('body').removeClass(className);
          }
        });

        $$('body').addClass('layout-'+themeData.layout);
        $$('body').addClass('theme-'+themeData.theme);

        Utils.options.setOption('theme', themeData);
      },

      render () {
        var me = this;


        var GoogleMap = Utils.elements.getElement('gmaps');
        var ThemeSelector = Utils.elements.getElement('themeSelector');
        me.options = {};
        me.options.location = Utils.options.getOption('location');
        me.options.timeZone = Utils.options.getOption('timeZone');
        me.options.dateTimeFormat = Utils.options.getOption('dateTimeFormat', 'LLL');
        me.options.theme = Utils.options.getOption('theme', {theme: 'blue', layout: 'white'});
        var currentTime = moment.tz(me.options.timeZone).format(me.options.dateTimeFormat);


        return (
          <div className="page-wrapper settings-page-wrapper">
            <div className="page-content">
              <div className="content-block-title">Generic Options</div>

              <div className="list-block accordion-list tablet-inset">
                <ul>
                  <li className="accordion-item"><a href="#" className="item-content item-link">
                      <div className="item-inner">
                        <div className="item-title">Location</div>
                      </div></a>
                    <div className="accordion-item-content">
                      <div className="content-block">
                        <GoogleMap name="locationMap" height="200px" value={me.options.location} onSetValue={this.setLocation} locateMeBtn="true" options={this.data.mapOptions} />
                      </div>
                    </div>
                  </li>
                  <li className="accordion-item"><a href="#" className="item-content item-link">
                      <div className="item-inner">
                        <div className="item-title">Time & Language</div>
                      </div></a>
                    <div className="accordion-item-content">
                      <div className="content-block">
                        <p>Time Zone: <b>{me.options.timeZone}</b></p>
                        <p>Time: <b>{currentTime}</b></p>
                        <input type="text" placeholder="Date/Time format" readOnly id="picker-datetime-format" />
                      </div>
                    </div>
                  </li>
                  <li className="accordion-item"><a href="#" className="item-content item-link">
                      <div className="item-inner">
                        <div className="item-title">Appearance</div>
                      </div></a>
                    <div className="accordion-item-content">
                      <div className="content-block">
                        <ThemeSelector onSetValue={this.setTheme} value={me.options.theme} />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="content-block-title">Technologies</div>
                <div className="list-block accordion-list tablet-inset">
                  <ul>

                    <li className="accordion-item"><a href="#" className="item-content item-link">
                        <div className="item-inner">
                          <div className="item-title">KNX</div>
                          <div className="item-after">
                            <span className="badge bg-green">enabled</span>
                          </div>
                        </div></a>
                      <div className="accordion-item-content">
                        <div className="content-block">

                        </div>
                      </div>
                    </li>

                  </ul>
                </div>
            </div>
            {this.props.children}
          </div>
        );
      }
    }), props:{}},
    navbar: {class: Utils.elements.getElement('settingsNavbar'), props:{title:'Settings / Options'}},
    toolbar: {class: Utils.elements.getElement('settingsTabbar'), props:{active:'settings/options'}}
  });
