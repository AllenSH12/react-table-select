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
  handleChange: function(e, selectedRows) {
    console.log('From change:');
    console.log(selectedRows);
  },

  handleClick: function(e) {
    console.log('From click:');
    console.log(this.refs.table.state.selectedRows);
  },

  render: function() {
    return (
      <div>
        <Table className="table" ref="table" data={data} onChange={this.handleChange} />
      </div>

    );
  }
});

React.render(<App />, document.body);
