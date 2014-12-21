var React = require('react');
var _ = require('lodash');

var TableHead = require('./table-head');
var TableBody = require('./table-body');

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
      .map(function(entry) {
        return Object.keys(entry);
      })
      .flatten()
      .uniq()
      .value();

    return (
      React.createElement('table', {
          className: this.props.className
        },
        React.createElement(TableHead, {
          fields: fields,
          onChange: this.handleHeaderChange
        }),
        React.createElement(TableBody, {
          data: this.props.data,
          fields: fields,
          onChange: this.handleRowChange
        })
      )
    );
  }
});

module.exports = Table;
