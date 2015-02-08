var React = require('react');

var TableHead = React.createClass({
  handleChange: function(e) {
    e.stopPropagation();

    this.props.onChange(e.target.checked);
  },

  render: function() {
    return (
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null,
            React.createElement('input', {
              'type': 'checkbox',
              'aria-label': 'toggle all rows selected',
              'checked': this.props.checked,
              'onChange': this.handleChange
            })
          ),
          this.props.fields.map(function(field, i) {
            return (
              React.createElement('th', {
                'key': i
              }, field)
            );
          })
        )
      )
    );
  }
});

module.exports = TableHead;
