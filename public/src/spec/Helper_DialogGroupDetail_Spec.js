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




        it("Should return the date in readable format", function() {
          //  YOUR CODE HERE
          var mock_date = new Date('Tue Jun 06 2975 09:58:41 GMT-0700');
          calc_date = helper.getDateString(mock_date);
          expect(calc_date).toBe('Tue, Jun 6');
        });

        it("Should return the time in readable format", function() {
          //  YOUR CODE HERE
          var mock_time = new Date('Tue Jun 06 2975 09:58:41 GMT-0700');
          calc_time = helper.getTimeString(mock_time);
          expect(calc_time).toBe('9:58 am');
        });




        it("Should return the date in readable format", function() {
          //  YOUR CODE HERE
          var mock_date = new Date('Wed Dec 31 1969 16:52:52 GMT-0800');
          calc_date = helper.getDateString(mock_date);
          expect(calc_date).toBe('Wed, Dec 31');
        });

        it("Should return the time in readable format", function() {
          //  YOUR CODE HERE
          var mock_time = new Date('Wed Dec 31 1969 16:52:52 GMT-0800');
          calc_time = helper.getTimeString(mock_time);
          expect(calc_time).toBe('4:52 pm');
        });
  	});
});