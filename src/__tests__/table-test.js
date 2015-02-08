jest
  .dontMock('../table')
  .dontMock('../table-head')
  .dontMock('../table-body');

describe('table', function() {
  var React = require('react/addons');
  var Table = require('../table');
  var TableHead = require('../table-head');
  var TableBody = require('../table-body');
  var TestUtils = React.addons.TestUtils;

  it('renders its sub-components', function() {
    var mock = jest.genMockFunction();

    var table = TestUtils.renderIntoDocument(
      <Table data={[{}]} onChange={mock}/>
    );

    // make sure the component has head and body sub-components
    TestUtils.findRenderedComponentWithType(table, TableHead);
    TestUtils.findRenderedComponentWithType(table, TableBody);
  });

  it('tells the client it has been changed', function() {
    var mock = jest.genMockFunction();

    var table = TestUtils.renderIntoDocument(
      <Table data={[{}]} onChange={mock} />
    );

    // find the tbody and checkbox of 1st row
    var tbody = TestUtils.findRenderedDOMComponentWithTag(table, 'tbody');
    var firstRowCheckbox = TestUtils.findRenderedDOMComponentWithTag(tbody, 'input');

    // simulate an event
    TestUtils.Simulate.change(firstRowCheckbox);

    // ensure that the callback has been called
    expect(mock.mock.calls.length).toEqual(1);
  });
});
