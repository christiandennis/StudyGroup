var helper = require('../helper.js');


const moment = require('moment');

// describe("validSubject", function () {
//   it("should multiply 2 and 3", function () {
//     var isValid = helper.isValidSubject('234567893456789');
//     expect(isValid).toBe('valid');
//   });
// });


//  TIME TESTING SECTION

describe(" --* Time Testing *-- ", function() {


  	describe("Testing Function CalculateTimeEpoch", function () {


      	it("Should return an integer", function() {

     		//  YOUR CODE HERE

     		var mock_date = new Date();

        	calc_time = helper.calculateTimeEpoch(mock_date,mock_date);

        	expect(typeof calc_time).toBe(typeof 0);

      	});

      	it("should return the current date when both inputs are current date in epoch", function() {
	        
        	//  YOUR CODE HERE
	
        	var mock_date = new Date();
	
        	calc_time = helper.calculateTimeEpoch(mock_date,mock_date);
	
        	expect(calc_time).toBe(moment(mock_date).unix());
	
      	});
	
      	it("shold return the next day if the epoch time to be added with 24 hrs in epoch", function() {
	        
        	// YOUR CODE HERE
	
        	var mock_date = new Date(0);
        	var mock_date2 = new Date(0);
	
        	// 11/25/2015 at 3:20
        	var assert_epoch = 1448421600
	
        	// 11/25/2015 at 1:23
        	mock_date.setUTCSeconds(1448414580)
	
        	// 12/25/2015 at 3:20
       		mock_date2.setUTCSeconds(1451013600);
	
        	calc_time = helper.calculateTimeEpoch(mock_date2,mock_date);
	
        	expect(calc_time).toBe(assert_epoch);
	
      	});
	
	
  	});

	describe("Testing Function CalculateTime", function () {


	      it("Should return a string", function() {

	     	//  YOUR CODE HERE

	     	var mock_date = new Date();

	        calc_time = helper.calculateTime(mock_date,mock_date);

	        expect(typeof calc_time).toBe(typeof "asd");

	      });

	      it("should return the current date when both inputs are current date in string", function() {
	        
	        //  YOUR CODE HERE

	        var mock_date = new Date();

	        calc_time = helper.calculateTime(mock_date,mock_date);

	        expect(calc_time).toBe(mock_date.toString());

	      });

	      it("shold return the next day if the epoch time to be added with 24 hrs in string", function() {
	        
	        // YOUR CODE HERE

	        var mock_date = new Date(0);
	        var mock_date2 = new Date(0);
	        var assert_date = new Date(0);

	        // 11/25/2015 at 3:20
	        var assert_epoch = 1448421600
	        assert_date.setUTCSeconds(assert_epoch);

	        // 11/25/2015 at 1:23
	        mock_date.setUTCSeconds(1448414580)

	        // 12/25/2015 at 3:20
	       	mock_date2.setUTCSeconds(1451013600);

	        calc_time = helper.calculateTime(mock_date2,mock_date);

	        expect(calc_time).toBe(assert_date.toString());

	      });


	});

	describe("Testing Function validateGroupDateTime", function () {


      	it("Should return a boolean", function() {

     		//  YOUR CODE HERE

     		var mock_date = new Date();

        	calc_time = helper.validateGroupDateTime(mock_date,mock_date);

        	expect(typeof calc_time).toBe(typeof false);

      	});

      	it("should return false if the input date time is the current time", function() {
	        
        	//  YOUR CODE HERE
	
        	var mock_date = new Date();
	
        	calc_time = helper.validateGroupDateTime(mock_date,mock_date);
	
        	expect(calc_time).toBe(false);
	
      	});
	
      	it("should return false if the input date time is in the past", function() {
	        
        	//  YOUR CODE HERE
	
        	var mock_date = new Date(0);

        	//  8/25/2013 at 00:00
        	mock_date.setUTCSeconds(1377388800)
	
        	calc_time = helper.validateGroupDateTime(mock_date,mock_date);
	
        	expect(calc_time).toBe(false);
	
      	});

      	it("should return true if the input date time is in the future", function() {
	        
        	//  YOUR CODE HERE
	
        	var mock_date = new Date(0);

        	//  12/25/2015 at 00:00
        	mock_date.setUTCSeconds(1577232000)
	
        	calc_time = helper.validateGroupDateTime(mock_date,mock_date);
	
        	expect(calc_time).toBe(true);
	
      	});
	
  	});

});


//  TIME TESTING SECTION

describe(" --* Card Testing *-- ", function() {


	describe("Testing Function isValidSubject", function () {


      	it("Should return a string", function() {

     		//  YOUR CODE HERE

     		var mock_subject = "laksdmaskldmsa";

        	result = helper.isValidSubject(mock_subject);

        	expect(typeof result).toBe(typeof "asda");

      	});

      	it("Should return 'empty' if the input subject is empty string '' ", function() {
	        
        	//  YOUR CODE HERE
	
        	var mock_subject = "";

        	result = helper.isValidSubject(mock_subject);

        	expect(result).toBe("empty");
	
      	});
	
      	it("Should return 'valid' if the subject is non empty and has no more than 10 characters", function() {
	        
        	// YOUR CODE HERE
	
			// 9 characters string
        	var mock_subject = "asdfghjkl";

        	result = helper.isValidSubject(mock_subject);

        	expect(result).toBe("valid");

      	});
		
		it("Should return 'toomuch' if the subject is non empty and has more than 10 characters", function() {
	        
        	// YOUR CODE HERE
	
        	var mock_subject = "asdfghjklajdalkdjalkdal";

        	result = helper.isValidSubject(mock_subject);

        	expect(result).toBe("toomuch");

      	});
		
	});

	describe("Testing Function isValidTitle", function () {


      	it("Should return a string", function() {

     		//  YOUR CODE HERE

     		var mock_title = "laksdmaskldmsa";

        	result = helper.isValidTitle(mock_title);

        	expect(typeof result).toBe(typeof "asda");

      	});

      	it("Should return 'empty' if the input title is empty string '' ", function() {
	        
        	//  YOUR CODE HERE
	
        	var mock_title = "";

        	result = helper.isValidTitle(mock_title);

        	expect(result).toBe("empty");
	
      	});
	
      	it("Should return 'valid' if the title is non empty and has no more than 10 characters", function() {
	        
        	// YOUR CODE HERE
	
			// 9 characters string
        	var mock_title = "asdfghjkl";

        	result = helper.isValidTitle(mock_title);

        	expect(result).toBe("valid");

      	});
		
		it("Should return 'toomuch' if the title is non empty and has more than 10 characters", function() {
	        
        	// YOUR CODE HERE
	
        	var mock_title = "asdfghjklajdalkdjalkdalaskjnaskjdnasjdasjkdnajkdnasjdknasdkjndkjandkjasndksajdnaksjdnaksjndaskjdn";

        	result = helper.isValidTitle(mock_title);

        	expect(result).toBe("toomuch");

      	});
		
	});

});
