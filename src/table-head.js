var React = require('react');

var TableHead = React.createClass({
  handleChange: function(e) {
    this.props.onChange(e);
  },

  render: function() {
    return React.createElement('thead', null,
      React.createElement('tr', null,
        React.createElement('th', null,
          React.createElement('input', {
            type: 'checkbox',
            onChange: this.handleChange
          })
        ),
        this.props.fields.map(function(field, i) {
          return React.createElement('th', {
            key: i
          }, field);
        })
      )
    );
  }
});

module.exports = TableHead;
