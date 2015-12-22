Utils.elements.addElement('themeSelector', React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired
  },
  values: {theme:null, layout:null},

  componentWillReceiveProps(props) {
    var me = this;
    me.values.theme = props.value.theme;
    me.values.layout = props.value.layout;
  },

  componentWillMount(){
    var me = this;
    me.values.theme = me.props.value.theme;
    me.values.layout = me.props.value.layout;
  },

  renderThemes() {
    var me = this;

    var themes = [{name:'gray'},{name:'white'},{name:'black'},{name:'lightblue'},{name:'yellow'},{name:'orange'},{name:'pink'},{name:'blue'},{name:'green'},{name:'red'}];

    return themes.map((theme) => {
        classObj = {
          'theme-option': true,
          'selected': me.values.theme==theme.name
        }
        classObj['bg-'+theme.name] = true;
        var classes = classNames(classObj);
        return <div key={theme.name} data-theme={theme.name} className={classes} />;
      });

  },

  renderLayout() {
    var me = this;
    var layouts = [{name:'light', color: 'white'},{name:'dark', color: 'black'}];

    return layouts.map((layout) => {
        classObj = {
          'layout-option': true,
          'selected': me.values.layout==layout.name
        }
        classObj['bg-'+layout.color] = true;
        var classes = classNames(classObj);
        return <div key={layout.name} data-layout={layout.name} className={classes} />;
      });

  },

  setTheme(e) {
    this.values.theme = $$(e.target).data('theme');
    this.props.onSetValue({theme: this.values.theme, layout: this.values.layout});
  },
  setLayout(e) {
    this.values.layout = $$(e.target).data('layout');
    this.props.onSetValue({theme: this.values.theme, layout: this.values.layout});
  },

  componentDidMount() {
    var me = this;
    $$(ReactDOM.findDOMNode(me)).on('click', 'div[data-theme]', me.setTheme);
    $$(ReactDOM.findDOMNode(me)).on('click', 'div[data-layout]', me.setLayout);
  },

  render() {
    return <div>
      <div className="content-block-title">Theme</div>
      <div className="theme-selector">{this.renderThemes()}</div>
      <div className="content-block-title">Layout</div>
      <div className="layout-selector">{this.renderLayout()}</div>
    </div>
  }

})
);
