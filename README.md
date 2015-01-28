#React Selectable Table

Table component with selectable rows for Facebook's [React](https://github.com/facebook/react)

An example styled w/ [Bootstrap](https://github.com/twbs/bootstrap):

![Selectable table screenshot](media/react-table-select.gif)

## Installation
This has been primarily developed for use with Browserify and as such is shared
as a CommonJS module via npm.

```sh
npm install --save react-table-select
```

## Usage
Assuming you're using JSX:
```js
var React = require('react');
var TableSelect = require('react-table-select');

React.render(
  <TableSelect
    className="table"
    data={data}
    onChange={this.handleChange} />, document.body);
```

To access the selected rows from outside of the component save the component as a ref:
```js
<TableSelect ref="table" />

// See the onChange method for more info on selectedRows
this.refs.table.state.selectedRows
```

## Props

#### `{string} className`

Optional, set the class on this component's child `table` element. Use this to apply styles or anything else that you need.

#### `{array} data`

An array of Objects to render as a selectable table.

#### `{array} columns`

Optional, use this if you'd like to specify custom fields. By default the table will create a column for every unique key it finds in the array, for example:
```js
this.props.data = [{one: 'fish'}, {two: 'fish'}, {red: 'fish'}, {blue: 'fish'}]
fields = [one, two, red, blue]
```

#### `{function} onChange`

Optional, a callback to work with the selectedRows when they change:
```js
callback = function(selectedRows) {}
```
`selectedRows` will be an `Array` of `Int`, the indices of the currently selected rows (empty if no rows are selected). Some concrete examples:
- No rows selected, `selectedRows` should be `[]`
- 1st row selected, `selectedRows` should be `[0]`
- 1st, 2nd, & 4th rows selected, `selectedRows` should be `[0, 1, 3]`

With the indices of the selected rows the selected data can be easily found using a `.map()` operation or similar.

##Example
A small example is included, to see it in action follow these steps:
```sh
git clone https://github.com/AllenSH12/react-table-select.git
cd react-table-select

npm install
gulp example

cd examples/
python -m SimpleHTTPServer # or an HTTP server of your choice

# visit localhost:8000 in your browser
```

##Testing
Tests are implemented with Facebook's [Jest](https://github.com/facebook/jest) and can be run via npm:
```sh
npm install # Only needs to be run the 1st time
npm test
```
