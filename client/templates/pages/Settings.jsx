Utils.pages.addPage('settings', {

    page: React.createClass({
      mixins: [ReactMeteorData],

      getMeteorData () {
        return {pages: Pages.find({}).fetch()}
      },

      renderPages () {
        return this.data.pages.map((page) => {
            return <PageMenuItem key={page._id} page={page}/>;
          });
      },

      render () {
        return (
          <div className="page-content">
            <div className="content-block-title">Settings Content</div>
            {this.renderPages()}
          </div>
        );
      }
    }),
    navbar: React.createClass({
      // Navbar

      render () {
        return (
          <div className="navbar-inner">
            <div className="left">
              <a href="#" data-back="back" className="link">
                  <i className="icon icon-back"></i>
                  <span>Back</span>
              </a>
            </div>
            <div className="center sliding">Settings Navbar</div>
          </div>
        );
      }
    })
  });
