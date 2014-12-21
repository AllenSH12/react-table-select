var React = require('react');

var TableRow = React.createClass({
  handleChange: function(i, e) {
    this.props.onChange(i, e);
  },

  render: function() {
    return React.createElement('tr', null,
      React.createElement('td', null,
        React.createElement('input', {
          type: 'checkbox',
          onChange: this.handleChange.bind(this, this.props.index)
        })
      ),
      this.props.fields.map(function(field, i) {
        return React.createElement('td', {
          key: i
        }, this.props.datum[field] ? this.props.datum[field] : '');
      }, this)
    );
  }
});

var TableBody = React.createClass({
  render: function() {
    return React.createElement('tbody', null,
      this.props.data.map(function(datum, i) {
        return React.createElement(TableRow, {
          datum: datum,
          fields: this.props.fields,
          key: i,
          index: i,
          onChange: this.props.onChange
        });
      }, this)
    );
  }
});

module.exports = TableBody;
