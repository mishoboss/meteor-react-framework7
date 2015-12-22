Utils = {};
Utils.pages = {};
Utils.refs = {};
Utils.elements = {};
Utils.options = {};
Utils.device = device.noConflict();


Utils.options.getOption = function (name, defaultValue){
  var value = Options.findOne({ name: name });
  if(value){
    return value.value;
  } else {
    return defaultValue;
  }
}

Utils.options.setOption = function (name, value) {
  Meteor.call('setOption', name, value);
  if(name == 'location'){
    TimeZoned.getTimeZoneForCoords(value.lat, value.lng, function (error, tz) {
      if(!error){
        Meteor.call('setOption', 'timeZone', tz);

      }
    });
  }
}

Utils.pages.callStaticMethod = function (pageName, obj, method, params) {
  if(window.hasOwnProperty('appPages') && window.appPages.hasOwnProperty(pageName)){
    window.appPages[pageName][obj].class[method].apply(params);
  }
}

Utils.pages.addPage = function (pageName, page) {
  if(!window.hasOwnProperty('appPages')){
    window.appPages = [];
  }
  window.appPages[pageName] = page;
}

Utils.elements.addElement = function (elementName, element) {
  if(!window.hasOwnProperty('appElements')){
    window.appElements = [];
  }
  window.appElements[elementName] = element;
}
Utils.elements.getElement = function (elementName) {
  if(window.hasOwnProperty('appElements') && window.appElements.hasOwnProperty(elementName)){
    return window.appElements[elementName];
  } else {
    return 'div';
  }
}


Utils.pages.loadPage = function (pageName, view, anim) {
  if(typeof anim == 'undefined'){
    anim: true
  }
  $$(document).once('pageBeforeInit', '.page[data-page="' + pageName + '"]', function(e) {
      var page = e.detail.page;

      if(window.appPages.hasOwnProperty(pageName)){
        var toolbar = null;
        if(window.appPages[pageName].toolbar){
          toolbar = React.createElement(window.appPages[pageName].toolbar.class, window.appPages[pageName].toolbar.props)
        }
        if(Framework7.prototype.device.android===true){
          ReactDOM.render(React.createElement('div', {className:'page'}, toolbar, React.createElement('div', {className:'navbar'}, React.createElement('div', {className:'navbar-inner'}, React.createElement(window.appPages[pageName].navbar.class, window.appPages[pageName].navbar.props))), React.createElement(window.appPages[pageName].page.class, window.appPages[pageName].page.props)), page.container);
        } else {
          ReactDOM.render(React.createElement(window.appPages[pageName].page.class, window.appPages[pageName].page.props, toolbar), page.container);
          ReactDOM.render(React.createElement(window.appPages[pageName].navbar.class, window.appPages[pageName].navbar.props), page.navbarInnerContainer);
        }

        if(window.appPages[pageName].subnavbar){
          $$(page.container).addClass('with-subnavbar');
          $$('.view .subnavbar').prependTo(page.container);
        }
        if(window.appPages[pageName].tabbarWithLabels){
          //$$(page.container).addClass('tabbar-labels-through');
        }
      } else {
        // NO PAGE FOUND
      }
    });

    if(window.appPages.hasOwnProperty(pageName)){
      if(Framework7.prototype.device.android===true){
        view.router.load({
            animatePages: anim,
            content: '<div class="page" data-page="' + pageName + '"></div>'
          });
        } else {
          view.router.load({
              animatePages: anim,
              content: '<div class="navbar"><div class="navbar-inner"></div></div><div class="page" data-page="' + pageName + '"></div>'
            });
        }
      }
}
