Utils.elements.addElement('deviceListItem', React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    device: React.PropTypes.object.isRequired
  },
  render() {
    return (
        <li className="item-content">
          <div className="item-media"><i className="icon icon-f7"></i></div>
          <div className="item-inner">
            <div className="item-title">{this.props.page.name}</div>
            <div className="item-after">{this.props.page.lastChangedAt.toTimeString()}</div>
          </div>
        </li>
    );
  }
  })
);
