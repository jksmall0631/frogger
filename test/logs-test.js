const assert = require('chai').assert;
var Log = require('../lib/logs.js');


describe('Log', function () {
  it('should be a function', function () {
    assert.isFunction(Log);
  });

  it('should instantiate our friend the frog', function () {
    var log = new Log(0,0,2,50);
    assert.isObject(log);
  });


});
