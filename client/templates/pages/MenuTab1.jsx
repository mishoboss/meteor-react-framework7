Utils.pages.addPage('menu/tab1', {

  subnavbar: true,
  page: {class: React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData () {
      return {pages: Pages.find({}).fetch()}
    },

    renderMenuItems () {
      var PageMenuItem = Utils.elements.getElement('pageMenuItem');
      return this.data.pages.map((page) => {
          return <PageMenuItem key={page._id} page={page}/>;
        });
    },

    addPage() {
      Meteor.call("addPage", {name:'Test Page '+Math.round(Math.random()*100), type:'room'});
    },

    render () {
      return (
        <div className="page-wrapper" style={{height: 'calc(100% - 88px)', top: '88px'}}>
          <div className="page-content">
                <div className="content-block-title">Tab1</div>
                {this.renderMenuItems()}
                <a onClick={this.addPage} style={{margin: "10px"}} className="button">Add Record</a>
          </div>
        </div>
      );
    }
  }), props:{}},

  navbar: {class: React.createClass({
    render () {
      return (
        <div className="navbar-wrapper">
            <div className="left"></div>
            <div className="center sliding">Menu</div>
            <div className="right"></div>
            <div className="subnavbar">
              <div className="buttons-row">
                <a data-page="menu/tab1" data-view="leftView" className="button tab-link active">Tab1</a>
                <a data-page="menu/tab2" data-view="leftView" className="button tab-link">Tab2</a>
              </div>
            </div>
          </div>
      );
    }
  }), props:{}}
});
