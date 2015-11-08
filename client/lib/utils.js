Utils = {};
Utils.pages = {};

Utils.pages.addPage = function (pageName, reactClass) {
  if(!window.hasOwnProperty('appPages')){
    window.appPages = [];
  }
  window.appPages[pageName] = reactClass;
}

Utils.pages.getPage = function (pageName) {
  if(window.appPages.hasOwnProperty(pageName)){
    return React.createElement(window.appPages[pageName]);
  } else {
    return React.createElement(window.appPages['page-not-found']);
  }

}
