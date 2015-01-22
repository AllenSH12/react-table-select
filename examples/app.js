var React = require('react');
var Table = require('../index');

var data = [
{
  "age": "<5",
  "population": "2704659",
  "minor": "True"
},
{
  "age": "5-13",
  "population": "4499890",
  "minor": "True"
},
{
  "age": "14-17",
  "population": "2159981",
  "minor": "True"
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

var App = React.createClass({
  getInitialState: function() {
    return {
      data: data,
      selected: []
    };
  },

  unselect: function(e) {
    e.preventDefault();

    this.handleChange([]);

    this.refs.table.setState({ selectedRows: [] });
  },

  log: function(e) {
    e.preventDefault();

    var selectedRows = this.refs.table.state.selectedRows;
    console.log(selectedRows);
  },

  fill: function(e) {
    e.preventDefault();

    var rows = [];

    for (var i = 0; i < this.state.data.length; i++) {
      rows.push(i);
    }

    this.handleChange(rows);

    this.refs.table.setState({
      selectedRows: rows
    });
  },

  handleChange: function(rows) {
    this.setState({
      selected: rows
    });
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 tester">
            <h4>External Controls:</h4>
            <div className="btn-group">
              <button
                className="btn btn-default"
                onClick={this.fill}>Select All</button>
              <button
                className="btn btn-default"
                onClick={this.unselect}>Unselect All</button>
            </div>
            <p className="selectedRowsString">Selected rows: {this.state.selected.join(', ')}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Table
              className="table"
              ref="table"
              data={this.state.data}
              onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App />, document.body);
