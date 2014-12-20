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
  handleChange: function(e) {
    this.props.onChange(e);
  },

  render: function() {
    return React.createElement('thead', null,
      React.createElement('tr', null,
        React.createElement('th', null,
          React.createElement('input', { type: 'checkbox', onChange: this.handleChange })
        ),
        this.props.fields.map(function(field, i) {
          return React.createElement('th', { key: i }, field);
        })
      )
    );
  }
});

var TableRow = React.createClass({
  handleChange: function(i, e) {
    this.props.onChange(i, e);
  },

  render: function() {
    return React.createElement('tr', null,
      React.createElement('td', null,
        React.createElement('input', { type: 'checkbox', onChange: this.handleChange.bind(this, this.props.index) })
      ),
      this.props.fields.map(function(field, i) {
        return React.createElement('td', { key: i }, this.props.datum[field] ? this.props.datum[field] : '');
      }, this)
    );
  }
});

var TableBody = React.createClass({
  render: function() {
    return React.createElement('tbody', null,
      this.props.data.map(function(datum, i) {
        return React.createElement(TableRow, { datum: datum, fields: this.props.fields, key: i, index: i, onChange: this.props.onChange });
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

  handleHeaderChange: function(e) {
    // TODO get this ref to data out of here
    var numRows = data.length;
    var selectedRows = [];
    var checked = e.target.checked;

    if (checked) {
      selectedRows = _.range(numRows);
    }

    console.log(selectedRows);

    this.setState({
      selectedRows: selectedRows
    });
  },

  handleRowChange: function(i, e) {
    var selectedRows = this.state.selectedRows;
    var currentIndex = selectedRows.indexOf(i);

    if (currentIndex >= 0) {
      // remove this entry from selectedRows
      selectedRows.splice(currentIndex, 1);
    } else {
      // add this entry to selectedRows
      selectedRows.push(i);
    }
    console.log(selectedRows);

    this.setState({
      selectedRows: selectedRows
    });
  },

  render: function() {
    var fields = _.chain(data)
        .map(function(entry) { return Object.keys(entry); })
        .flatten()
        .uniq()
        .value();

    return (
      React.createElement('table', { className: this.props.className },
        React.createElement(TableHead, { fields: fields, onChange: this.handleHeaderChange }),
        // TODO get this ref to data out of here
        React.createElement(TableBody, { data: data, fields: fields, onChange: this.handleRowChange })
      )
    );
  }
});

module.exports = Table;
