Utils = {};
Utils.pages = {};

Utils.pages.addPage = function (pageName, page) {
  if(!window.hasOwnProperty('appPages')){
    window.appPages = [];
  }
  window.appPages[pageName] = page;
}

Utils.pages.getPage = function (pageName) {
  if(window.appPages.hasOwnProperty(pageName)){
    return React.createElement(window.appPages[pageName].page);
  } else {
    return React.createElement(window.appPages['page-not-found']);
  }
}

Utils.pages.getPageNavbar = function (pageName) {
  if(window.appPages.hasOwnProperty(pageName)){
    return React.createElement(window.appPages[pageName].navbar);
  }
}

Utils.pages.loadPage = function (pageName, view) {
  $$(document).once('pageBeforeInit', '.page[data-page="' + pageName + '"]', function(e) {
      var page = e.detail.page;
      // Render Page Content
      ReactDOM.render(Utils.pages.getPage(page.name), page.container);
      // Render Navbar Content
      ReactDOM.render(Utils.pages.getPageNavbar(page.name), page.navbarInnerContainer);
    });
  // Load pummy navbar + page
  view.router.load({
      content: '<div class="navbar"><div class="navbar-inner"></div></div><div class="page" data-page="' + pageName + '"></div>'
    });
}
