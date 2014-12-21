jest
  .dontMock('../table')
  .dontMock('../table-head')
  .dontMock('../table-body')
  .dontMock('lodash');

describe('table', function() {
  it('renders its sub-components', function() {
    var React = require('react/addons');
    var Table = require('../table');
    var TableHead = require('../table-head');
    var TableBody = require('../table-body');
    var TestUtils = React.addons.TestUtils;
    var mock = jest.genMockFunction();

    var table = TestUtils.renderIntoDocument(
      <Table data={[{}]} onChange={mock}/>
    );

    // make sure the component has head and body sub-components
    TestUtils.findRenderedComponentWithType(table, TableHead);
    TestUtils.findRenderedComponentWithType(table, TableBody);
  });
});
