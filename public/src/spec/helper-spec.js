var helper = require('../helper.js');

describe("validSubject", function () {
  it("should multiply 2 and 3", function () {
    var isValid = helper.isValidSubject('234567893456789');
    expect(isValid).toBe('valid');
  });
});   