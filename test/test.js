//assertion library - makes life easier
var assert = require('assert');

example test
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

//describe is a way to group tests in mocha
describe('FrontEnd', function(){
  //it is used for an individual test case
  it('(this is a test description) description of what this should do', function() {
    //test case goes here
  })
});