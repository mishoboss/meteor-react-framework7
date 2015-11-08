Utils.pages.addPage('default', {
    page: React.createClass({
      render () {
        return (
          <div className="page-content">
            <div className="content-block-title">Start Page</div>
            Start Page
          </div>
        );
      }
    }),
    navbar: React.createClass({
      render () {
        return (
          <div className="navbar-inner">
            <div className="left">
              <a href="#" data-panel="left" className="menu-panel-btn link open-panel icon-only">
                <i className="icon icon-bars"></i>
              </a>
            </div>
            <div className="center sliding">App</div>
            <div className="right">
              <a data-page="settings" data-view="mainView" className="link icon-only">
                <i className="icon ion-android-settings"></i>
              </a>
            </div>
          </div>
        );
      }
    })
  });
