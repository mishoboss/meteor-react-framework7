Utils.elements.addElement('gmaps', React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    height: React.PropTypes.string.isRequired
  },

  componentWillReceiveProps(props) {
    var me = this;
    if(props.value){
      me.setMarker(new google.maps.LatLng(props.value.lat, props.value.lng));
    }
  },

  componentDidMount() {
    var me = this;
    me.props.options.center = new google.maps.LatLng(41.850033, -87.6500523);
    GoogleMaps.create({
      name: me.props.name,
      element: ReactDOM.findDOMNode(me),
      options: me.props.options
    });

    GoogleMaps.ready(me.props.name, function(map) {
      me.marker = new google.maps.Marker({
        map: map.instance,
        title: "My Location",
        draggable: true
      });
      if(me.props.value){
        me.setMarker(new google.maps.LatLng(me.props.value.lat, me.props.value.lng));
      }

      google.maps.event.addListener(me.marker,'dragend',function(event) {
        me.props.onSetValue({lat: me.marker.getPosition().lat(), lng:me.marker.getPosition().lng()});
      });


      //me.locateMe();
    });

    if(me.props.locateMeBtn){
      var domNode = ReactDOM.findDOMNode(me),
          btn = document.createElement("a");
      btn.innerHTML = 'Locate Me!';
      btn.className = 'button active';
      btn.addEventListener('click', me.locateMe);
      domNode.parentNode.insertBefore(btn, domNode.nextSibling);
    }
  },

  locateMe() {
    var me = this;
    if(navigator.geolocation) {
      Utils.refs.f7.showPreloader('Retrieving location...');
      navigator.geolocation.getCurrentPosition(function(position){
        Utils.refs.f7.hidePreloader();
        me.setMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        me.props.onSetValue({lat: position.coords.latitude, lng:position.coords.longitude});
      });
    } else {
      error('Geo Location is not supported');
    }
  },

  setMarker(coords){
    var me = this;
    GoogleMaps.maps[me.props.name].instance.panTo(coords);
    me.marker.setPosition(coords);
  },

  render() {
    return <div style={{height: this.props.height}}></div>
  }
})
);
