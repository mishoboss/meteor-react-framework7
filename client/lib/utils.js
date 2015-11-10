Utils = {};
Utils.pages = {};
Utils.elements = {};

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


Utils.pages.loadPage = function (pageName, view) {
  $$(document).once('pageBeforeInit', '.page[data-page="' + pageName + '"]', function(e) {
      var page = e.detail.page;

      if(window.appPages.hasOwnProperty(pageName)){
        if(Framework7.prototype.device.android===true){
          ReactDOM.render(React.createElement('div', {className:'page'}, React.createElement('div', {className:'navbar'}, React.createElement('div', {className:'navbar-inner'}, React.createElement(window.appPages[pageName].navbar.class, window.appPages[pageName].navbar.props))), React.createElement(window.appPages[pageName].page.class, window.appPages[pageName].page.props)), page.container);
        } else {
          ReactDOM.render(React.createElement(window.appPages[pageName].page.class, window.appPages[pageName].page.props), page.container);
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
            content: '<div class="page" data-page="' + pageName + '"></div>'
          });
        } else {
          view.router.load({
              content: '<div class="navbar"><div class="navbar-inner"></div></div><div class="page" data-page="' + pageName + '"></div>'
            });
        }
      }
}
