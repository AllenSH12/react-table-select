jest
  .dontMock('../table-head');

describe('table head', function() {
  it ('calls the callback', function() {
    var React = require('react/addons');
    var TableHead = require('../table-head');
    var TestUtils = React.addons.TestUtils;
    var mock = jest.genMockFunction();

    var thead = TestUtils.renderIntoDocument(
      <TableHead fields={[]} onChange={mock}/>
    );

    var checkbox = TestUtils.findRenderedDOMComponentWithTag(thead, 'input');
    expect(checkbox.getDOMNode().checked).toBe(false);

    TestUtils.Simulate.change(checkbox);
    expect(mock).toBeCalled();
  });
});
