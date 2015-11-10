Utils.elements.addElement('settingsNavbar', React.createClass({
      render () {
        this.backBtn = '';
        if(!this.props.hasOwnProperty('backBtn') || this.props.backBtn===true){
          this.backBtn = <a href="#" data-back="back" className="link"><i className="icon icon-back"></i><span>Back</span></a>
        }

        return (
          <div className="navbar-wrapper">
            <div className="left">
              {this.backBtn}

            </div>
            <div className="center sliding">{this.props.title}</div>
          </div>
        );
      }
  })
);
