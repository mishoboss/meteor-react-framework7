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

                </div>
              </div>
              <div className="pages">
                  <div className="page"></div>
              </div>
            </div>
          </div>

          <div className="view view-main navbar-through">

            <div className="navbar">
              <div className="navbar-inner">

              </div>
            </div>

            <div className="pages">
                <div className="page"></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
});
