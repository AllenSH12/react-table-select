var React = require('react');
var _ = require('lodash');

var data = [
  {
    "age": "<5",
    "population": "2704659",
    "minor": "true"
  },
  {
    "age": "5-13",
    "population": "4499890"
  },
  {
    "age": "14-17",
    "population": "2159981"
  },
  {
    "age": "18-24",
    "population": "3853788"
  },
  {
    "age": "25-44",
    "population": "14106543"
  },
  {
    "age": "45-64",
    "population": "8819342"
  },
  {
    "age": "≥65",
    "population": "612463"
  }
];

var TableHead = React.createClass({
  render: function() {
    return React.createElement('thead', null,
      React.createElement('tr', null,
        this.props.fields.map(function(field, i) {
          return React.createElement('th', { key: i }, field);
        })
      )
    );
  }
});

var TableBody = React.createClass({
  render: function() {
    return React.createElement('tbody', null,
      this.props.data.map(function(datum, i) {
        return React.createElement('tr', { key: i },
          this.props.fields.map(function(field, i) {
            return React.createElement('td', { key: i }, datum[field] ? datum[field] : '');
          })
        );
      }, this)
    );
  }
});

var Table = React.createClass({
  getInitialState: function() {
      return {
        selectedRows: []
      };
  },

  render: function() {
    var fields = _.chain(data)
        .map(function(entry) { return Object.keys(entry); })
        .flatten()
        .uniq()
        .value();

    return (
      React.createElement('table', null,
        React.createElement(TableHead, { fields: fields }),
        React.createElement(TableBody, { data: data, fields: fields })
      )
    );
  }
});

module.exports = Table;
