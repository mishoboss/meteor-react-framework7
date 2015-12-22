Utils.elements.addElement('settingsNavbar', React.createClass({

      renderRight(){
        if(this.props.hasOwnProperty('right')){
          return this.props.right;
        } else {
          return null;
        }
      },

      renderLeft(){
        if(this.props.hasOwnProperty('left')){
          return this.props.left;
        } else {
          return '';
        }
      },

      renderBackBtn(){
        var backBtn = '';
        if(!this.props.hasOwnProperty('backBtn') || this.props.backBtn===true){
          backBtn = <a href="#" data-back="back" className="link"><i className="icon icon-back"></i><span>Back</span></a>
        }
        return backBtn;
      },

      render() {
        return (
          <div className="navbar-wrapper">
            <div className="left">
              {this.renderBackBtn()}
              {this.renderLeft()}
            </div>
            <div className="center sliding">{this.props.title}</div>
            <div className="right">{this.renderRight()}</div>
          </div>
        );
      }
  })
);
