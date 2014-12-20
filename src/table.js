var React = require('react');

var TableHead = React.createClass({
  render: function() {
    return React.createElement('thead', null,
      React.createElement('tr', null, '1')
    );
  }
});

module.exports = React.createClass({
  getInitialState: function() {
      return {
        selectedRows: []
      };
  },

  render: function() {
    return (
      React.createElement('div', null, 'test')
    );
  }
});
