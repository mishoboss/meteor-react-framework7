Utils.pages.addPage('page-not-found', React.createClass({
  render () {
    return (
      <div className="page-content">
        <div className="content-block-title">Page Not Found!</div>
        Requested page is not found!
      </div>
    );
  }
}));
