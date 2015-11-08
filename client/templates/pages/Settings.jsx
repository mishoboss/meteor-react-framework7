Utils.pages.addPage('settings', React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      pages: Pages.find({}).fetch()
    }
  },

  renderPages() {
    return this.data.pages.map((page) => {
      console.log('Page', page);
      return <PageMenuItem key={page._id} page={page} />;
    });
  },

  render () {
    return (
      <div>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="left">
            <a href="#" data-panel="left" className="menu-panel-btn link open-panel icon-only">
              <i className="icon icon-bars"></i>
            </a>
          </div>
          <div className="center sliding">Settings</div>
        </div>
      </div>

      <div className="page" data-page="Settings">
      <div className="page-content">
        <div className="content-block-title">Settings</div>
        {this.renderPages()}
      </div>

    </div>
  </div>
    );
  }
}));
