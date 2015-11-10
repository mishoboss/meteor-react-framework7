Utils.elements.addElement('pageMenuItem', React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    page: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <div className="card page-card">
        <div style={{'backgroundImage': 'url()'}} valign="bottom" className="card-header color-white no-border">Journey To Mountains</div>
        <div className="card-content">
          <div className="card-content-inner">
            <p className="color-gray">{this.props.page.createdAt.toTimeString()}</p>
            <p>{this.props.page.name}</p>
          </div>
        </div>
        <div className="card-footer">
          <a href="#" className="link">Like</a>
          <a href="#" className="link">Read more</a>
        </div>
      </div>
    );
  }
  })
);
