jest
  .dontMock('../table-body');

describe('table body', function() {
  it ('should render a tr for every entry', function() {
    var React = require('react/addons');
    var TableBody = require('../table-body');
    var TestUtils = React.addons.TestUtils;
    var mock = jest.genMockFunction();

    var fixtures = [{}, {}, {}];

    // test fails if checkedRows or fields is not supplied
    var tbody = TestUtils.renderIntoDocument(
      <TableBody data={fixtures} fields={[]} checkedRows={[]} onChange={mock}/>
    );

    var rows = TestUtils.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    expect(rows.length).toBe(fixtures.length);
  });
});
