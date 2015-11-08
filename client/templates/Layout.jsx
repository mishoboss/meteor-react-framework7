Layout = React.createClass({
  render () {
    return (
      <div style={{height: '100%'}}>
        <div className="statusbar-overlay"></div>
        <div className="views">
          <div className="panel-overlay"></div>
          <div className="panel panel-left panel-cover">
            <div className="view view-left navbar-through">
              <div className="navbar">
                <div className="navbar-inner">
                  <div className="left"></div>
                  <div className="center sliding">Menu</div>
                  <div className="right"></div>
                </div>
                <div className="subnavbar">
                  <div className="buttons-row">
                    <a data-page="menu/tab1" data-view="leftView" className="button tab-link active">Tab1</a>
                    <a data-page="menu/tab2" data-view="leftView" className="button tab-link">Tab2</a>
                  </div>
                </div>
              </div>

              <div id="menu-content" className="pages">

              </div>
            </div>
          </div>

          <div className="view view-main navbar-through">

            <div className="navbar">
              <div className="navbar-inner">
                <div className="left">
                  <a href="#" data-panel="left" className="menu-panel-btn link open-panel icon-only">
                    <i className="icon icon-bars"></i>
                  </a>
                </div>
                <div className="center sliding">Test</div>
                <div className="right">
                  <a data-page="settings" data-view="mainView" className="link">
                    <i className="icon ion-android-settings"> Click Me</i>
                  </a>
                </div>
              </div>
            </div>

            <div className="pages">
              <div id="view-main" data-page="menu-default" className="page">
                <div className="page-content">
                <div className="content-block-title">Problem Description</div>
                  <b>This is a showcase of Meteor/React/Framework7 combo issues.</b><br /><br />Left view is imidately rendered with ReactDOM.render(). If you click the <b>Add Record</b> button a new record will be added to Mongo and the page will render it. Now click on the <b>Click Me</b> button in the upper right corner. It will load a new page in the main view. Now, when you click again <b>Add Record</b>, the left view is updated correctly, but the main view produce an error. This is because F7 <b>app.router.load()</b> manipulates the DOM and this is against React philosophy.</div>
                </div>
          </div>

          </div>
        </div>
      </div>
    );
  }
});
