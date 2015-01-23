var React = require('react');

var TableHead = require('./table-head');
var TableBody = require('./table-body');

var Table = React.createClass({
  getInitialState: function() {
    return {
      selectedRows: []
    };
  },

  /**
   * if any rows have been added or removed set selected rows to none
   * @param {Object} nextProps  the next properties of the Table (updated data)
   */
  componentWillReceiveProps: function(nextProps) {
    var changingRowCount = this.props.data.length !== nextProps.data.length;

    if (changingRowCount) {
      this.setState({ selectedRows: [] });
    }
  },

  /**
   * set selectedRows to all (de)selected and update UI accordingly
   * @param {Boolean} checked   check status of the all selected checkbox
   */
   handleHeadChange: function(checked) {
     var selectedRows = [];
     var i;

     if (checked) {
       for (i = 0; i < this.props.data.length; i++) {
         selectedRows.push(i);
       }
     }

     this.onChange(selectedRows);
   },

  /**
   * respond to a user (de)selecting a single row
   * @param {Int} i             the index of the row that was clicked
   * @param {Boolean} checked   the new check status of that row
   */
   handleBodyChange: function(i, checked) {
     var selectedRows = this.state.selectedRows.slice();
     var index;


     function sortedIndex(array, newElement) {
       var lessThan = array.filter(function(el, i) {
         return el < newElement;
       });

       return lessThan.length;
     }

     if (checked) {
       index = sortedIndex(selectedRows, i);
       selectedRows.splice(index, 0, i);

     } else {
       index = selectedRows.indexOf(i);
       selectedRows.splice(index, 1);
     }

     this.onChange(selectedRows);
   },

   /**
    * if applicable inform parent component of change, in any case
    * update the component's internal state
    * @param {[type]} selectedRows [description]
    */
   onChange: function(selectedRows) {
     if (this.props.onChange) {
       this.props.onChange(selectedRows);
     }

     this.setState({
       selectedRows: selectedRows
     });
   },

  render: function() {
    var fields = this.props.data.map(Object.keys);

    if (fields.length) {
      fields = fields.reduce(function(prev, curr) {
          return prev.concat(curr);
        }).filter(function(field, i, array) {
          return array.indexOf(field) === i;
        });
    }

    var selectedRows = this.state.selectedRows;
    var allRowsSelected = this.props.data.length === selectedRows.length;

    var rowStates = [];
    selectedRows.map(function(row) {
      rowStates[row] = true;
    });

    return (
      React.createElement('table', {
          className: this.props.className
        },
        React.createElement(TableHead, {
          fields: fields,
          onChange: this.handleHeadChange,
          checked: allRowsSelected
        }),
        React.createElement(TableBody, {
          data: this.props.data,
          fields: fields,
          checkedRows: rowStates,
          onChange: this.handleBodyChange
        })
      )
    );
  }
});

module.exports = Table;
