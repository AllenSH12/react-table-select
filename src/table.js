var React = require('react');
var _ = require('lodash');

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
    var numRows = this.props.data.length;
    var selectedRows = [];
    var checked = e.target.checked;

    if (checked) {
      selectedRows = _.range(numRows);
    }

    var tableNode = this.getDOMNode();
    var rowCheckboxes = tableNode.querySelectorAll('td > input[type=checkbox]');
    _.range(numRows).map(function(index) {
      rowCheckboxes[index].checked = checked;
    });

    this.props.onChange(selectedRows);
    this.setState({
      selectedRows: selectedRows
    });
  },

  handleRowChange: function(i, e) {
    var selectedRows = this.state.selectedRows;
    var currentIndex = selectedRows.indexOf(i);
    var deselectingRow = currentIndex >= 0;
    var selectingLastRow = this.props.data.length - 1 === this.state.selectedRows.length && !deselectingRow;
    var deselectingLastRow = deselectingRow && this.props.data.length === this.state.selectedRows.length;

    if (selectingLastRow) {
      // check header checkbox and add this entry to selectedRows
      this.getDOMNode().querySelector('th > input[type=checkbox]').checked = true;
      selectedRows.push(i);
    } else if (deselectingLastRow) {
      // uncheck header checkbox and remove this entry from selectedRows
      this.getDOMNode().querySelector('th > input[type=checkbox]').checked = false;
      selectedRows.splice(currentIndex, 1);
    } else if (deselectingRow) {
      // remove this entry from selectedRows
      selectedRows.splice(currentIndex, 1);
    } else {
      // add this entry to selectedRows
      selectedRows.push(i);
    }

    this.props.onChange(selectedRows);
    this.setState({
      selectedRows: selectedRows
    });
  },

  render: function() {
    var fields = _.chain(this.props.data)
        .map(function(entry) { return Object.keys(entry); })
        .flatten()
        .uniq()
        .value();

    return (
      React.createElement('table', { className: this.props.className },
        React.createElement(TableHead, { fields: fields, onChange: this.handleHeaderChange }),
        React.createElement(TableBody, { data: this.props.data, fields: fields, onChange: this.handleRowChange })
      )
    );
  }
});

module.exports = Table;
