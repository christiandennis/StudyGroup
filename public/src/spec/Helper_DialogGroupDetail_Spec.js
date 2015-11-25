var helper = require('../helper/Helper_Dialog_GroupDetail.js');
const moment = require('moment');

//  TIME TESTING SECTION

describe(" --* Card Time Testing *-- ", function() {
  	describe("Testing Function CalculateTimeEpoch", function () {

      	it("Should return the date in readable format", function() {
     		//  YOUR CODE HERE
     		var mock_date = new Date('Tue Nov 24 2015 23:05:26 GMT-0800');
      	calc_date = helper.getDateString(mock_date);
      	expect(calc_date).toBe('Tue, Nov 24');
      	});

        it("Should return the time in readable format", function() {
        //  YOUR CODE HERE
        var mock_time = new Date('Tue Nov 24 2015 23:05:00 GMT-0800');
        calc_time = helper.getTimeString(mock_time);
        expect(calc_time).toBe('11:05 pm');
        });
  	});
});