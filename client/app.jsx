Meteor
  .startup(function() {

    ReactDOM.render(
      <Layout/>, document.getElementById("react-main-wrapper"));
    Meteor.subscribe("pages");

    isAndroid = Framework7.prototype.device.android === true;
    isIos = Framework7.prototype.device.ios === true;

    window.$$ = Dom7;

    if (isAndroid) {
      $$('head').append('<link rel="stylesheet" href="packages/mishoboss_framework7/framework7/dist/css/framework7.material.min.css">' +
        '<link rel="stylesheet" href="packages/mishoboss_framework7/framework7/dist/css/framework7.material.colors.min.css">' +
        '<link rel="stylesheet" href="css/app.css">' +
        '<link rel="stylesheet" href="css/app.material.css">');
    } else {
      $$('head').append('<link rel="stylesheet" href="packages/mishoboss_framework7/framework7/dist/css/framework7.ios.min.css">' +
        '<link rel="stylesheet" href="packages/mishoboss_framework7/framework7/dist/css/framework7.ios.colors.min.css">' +
        '<link rel="stylesheet" href="css/app.css">' +
        '<link rel="stylesheet" href="css/app.ios.css">');
    }

    $$(document)
      .on('pageBeforeAnimation', function(e) {
        var pageUrl = e.detail.page.url;
        if (pageUrl.indexOf('#settings') == -1) {
          console.log('NO SETTINGS');
          $$('body').removeClass('settings');
        } else {
          console.log('SETTINGS');
          $$('body').addClass('settings');
          f7.sizeNavbars('.view-main .navbar');
        }
      });

    var f7 = new Framework7({
      // Enable Material theme for Android device only
      material: isAndroid
        ? true
        : false,
      pushState: true,
      dynamicPageUrl: '{{name}}'
    });

    if (isAndroid) {
      // Change class
      $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
      // And move Navbar into Page
      $$('.view .navbar').remove();
    }

    leftView = f7.addView('.view-left', {
      dynamicNavbar: true,
      domCache: true
    });

    mainView = f7.addView('.view-main', {
      dynamicNavbar: true,
      domCache: true
    });

    f7.onPageInit('*', function(page) {
      //console.log('page.name', page.name);
      if (page) {
        //ReactDOM.render(Utils.pages.getPage(page.name), page.container);
      }
    });

    $$(document).on('click', 'a[data-back]', function(e) {
      var link = $$(e.target);
      if (!link.is('a[data-back]')) {
        link = link.parents('a[data-back]');
      }
      var view = link.attr('data-view');
      if (view) {
        if (view == 'leftView') {
          container = leftView;
        } else {
          container = mainView;
        }
      } else {
        container = mainView;
      }
      container.router.back();
    });

    $$(document).on('click', 'a[data-page]', function(e) {
      var link = $$(e.target);
      if (!link.is('a[data-page]')) {
        link = link.parents('a[data-page]');
      }

      var page = link.attr('data-page'); //.replace('/', '_');
      var view = link.attr('data-view');
      var anim = link.attr('data-anim');
      console.log(anim);
      if(anim){
        if(anim == 'true'){
          anim = true;
        } else {
          anim = false;
        }
      } else {
        anim = true;
      }
      var container;
      if (view) {
        if (view == 'leftView') {
          container = leftView;
        } else {
          container = mainView;
        }
      } else {
        container = mainView;
      }

      Utils.pages.loadPage(page, container, anim);
    }, true);

    // render content in menu right after startup
    Utils.pages.loadPage('default', mainView, false);
    Utils.pages.loadPage('menu/tab1', leftView, false);

  });
