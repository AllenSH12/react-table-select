var React = require('react');
var Table = require('../index');

var App = React.createClass({
  render: function() {
    return (
      <Table className="table"/>
    );
  }
});

React.render(<App />, document.body);
