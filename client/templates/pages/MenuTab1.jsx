Utils
  .pages
  .addPage('menu/tab1', React.createClass({
    mixins: [ReactMeteorData], getMeteorData () {
      return {pages: Pages.find({})
          .fetch()}
    },

    renderMenuItems () {
      return this.data
        .pages
        .map((page) => {
          return <PageMenuItem key={page._id} page={page}/>;
        });
    },

    addPage() {
      console.log('add record');
      Meteor.call("addPage", {name:'Test Page '+Math.round(Math.random()*100), type:'room'});
    },

    render () {
      return (
        <div>
          <div className="navbar">
            <div className="navbar-inner">
              <div className="center sliding">Menu</div>
            </div>
          </div>
          <div className="page with-subnavbar" data-page="page/tab1">
            <div className="page-content">
              <div className="content-block-title">Tab1</div>
              {this.renderMenuItems()}
              <a onClick={this.addPage} style={{margin: "10px"}} className="button">Add Record</a>
            </div>
          </div>
        </div>
      );
    }
  }));
