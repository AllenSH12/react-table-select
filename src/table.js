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

  /**
   * set selectedRows to all (de)selected and update UI accordingly
   * @param {SyntheticEvent} e click event on checkbox in header
   */
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

    this.props.onChange(e, selectedRows);
    this.setState({
      selectedRows: selectedRows
    });
  },

  /**
   * respond to a user (de)selecting a single row
   * much of the logic here is focused on a user (de)selecting the last row so
   * that the '(de)select all' checkbox in the header shows the right state
   *
   * @param {Int} i the index of the row that was clicked
   * @param {SyntheticEvent} e the click event that caused this change
   */
  handleRowChange: function(i, e) {
    var selectedRows = this.state.selectedRows;
    var currentIndex = selectedRows.indexOf(i);
    var deselectingRow = currentIndex >= 0;
    var selectingLastRow = this.props.data.length - 1 === this.state.selectedRows.length && !deselectingRow;
    var deselectingLastRow = deselectingRow && this.props.data.length === this.state.selectedRows.length;

    var selectAllCheckbox = this.getDOMNode().querySelector('th > input[type=checkbox]');

    if (selectingLastRow) {
      selectAllCheckbox.checked = true;
    } else if (deselectingLastRow) {
      selectAllCheckbox.checked = false;
    }

    if (deselectingRow) {
      // remove this entry from selectedRows
      selectedRows.splice(currentIndex, 1);
    } else {
      // add this entry to selectedRows
      selectedRows.push(i);
    }

    this.props.onChange(e, selectedRows);
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
