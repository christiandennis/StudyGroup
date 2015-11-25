var helper = require('../helper/Helper_Dialog_SignUp.js');


const moment = require('moment');

//  TIME TESTING SECTION

describe(" --* Validation Testing *-- ", function() {


  	describe("Testing Function validateUsername", function () {


      	it("Should return a boolean", function() {

     		//  YOUR CODE HERE

     		var mock_username= "johncena";

      	result = helper.validateUsername(mock_username);

      	expect(typeof result).toBe(typeof true);

      	});


        it("Should return true if username is not an empty string '' ", function() {

        //  YOUR CODE HERE

        var mock_username= "johncena";

        result = helper.validateUsername(mock_username);

        expect(result).toBe(true);

        });

        it("Should return false if username is an empty string '' ", function() {

        //  YOUR CODE HERE

        var mock_username= "";

        result = helper.validateUsername(mock_username);

        expect(result).toBe(false);

        });
  
    });

    describe("Testing Function validateFullName", function () {


        it("Should return a boolean", function() {

        //  YOUR CODE HERE

        var mock_fname= "johncena";

        result = helper.validateFullName(mock_fname);

        expect(typeof result).toBe(typeof true);

        });


        it("Should return true if full name is not an empty string '' ", function() {

        //  YOUR CODE HERE

        var mock_fname= "johncena";

        result = helper.validateFullName(mock_fname);

        expect(result).toBe(true);

        });

        it("Should return false if full name is an empty string '' ", function() {

        //  YOUR CODE HERE

        var mock_school= "";

        result = helper.validateFullName(mock_school);

        expect(result).toBe(false);

        });
  
    });

    describe("Testing Function validateSchool", function () {


        it("Should return a boolean", function() {

        //  YOUR CODE HERE

        var mock_school= "UC Berkeley";

        result = helper.validateSchool(mock_school);

        expect(typeof result).toBe(typeof true);

        });


        it("Should return true if full name is not an empty string '' ", function() {

        //  YOUR CODE HERE

        var mock_school= "UC Berkeley";

        result = helper.validateSchool(mock_school);

        expect(result).toBe(true);

        });

        it("Should return false if full name is an empty string '' ", function() {

        //  YOUR CODE HERE

        var mock_school= "";

        result = helper.validateSchool(mock_school);

        expect(result).toBe(false);

        });
  
    });

    describe("Testing Function validateEmail", function () {


        it("Should return a string", function() {

        //  YOUR CODE HERE

        var mock_email= "johncena@g.com";

        result = helper.validateEmail(mock_email);

        expect(typeof result).toBe(typeof "asd");

        });


        it(" Should return invalid if it doesnt have any symbol @ on it. ", function() {

        //  YOUR CODE HERE

        var mock_email= "johncenag.com";

        result = helper.validateEmail(mock_email);

        expect(result).toBe("invalid");

        });

        it(" Should return invalid if it has more than one symbol @ on it. ", function() {

        //  YOUR CODE HERE

        var mock_email= "johncenag@@.com";

        result = helper.validateEmail(mock_email);

        expect(result).toBe("invalid");

        });

        it(" Should return invalid if it doesnt have symbol '.'' in it . ", function() {

        //  YOUR CODE HERE

        var mock_email= "johncenag@@com";

        result = helper.validateEmail(mock_email);

        expect(result).toBe("invalid");

        });

        it(" It returns valid if the input email has one symbol '@' and one symbol '.' ", function() {

        //  YOUR CODE HERE

        var mock_email= "johncena@g.com";

        result = helper.validateEmail(mock_email);

        expect(result).toBe("valid");

        });
  
    });

    describe("Testing Function validatePasswordMatch", function () {


        it("Should return a string", function() {

        //  YOUR CODE HERE

        var mock_pass= "johncena";

        result = helper.validatePasswordMatch(true, mock_pass,mock_pass);

        expect(typeof result).toBe(typeof "asd");

        });


        it(" Should return tooshort if it has less than 8 characters ", function() {

        //  YOUR CODE HERE

        var mock_pass= "john";

        result = helper.validatePasswordMatch(true, mock_pass,mock_pass);

        expect(result).toBe("tooshort");

        });

        it(" Should return nonmatch if the password and confirm_pass does not match ", function() {

        //  YOUR CODE HERE

        var mock_pass= "johncenaasdkqdnoq";
        var mock_confirm = "johncenajlasdnasljdna";

        result = helper.validatePasswordMatch(true, mock_pass,mock_confirm);

        expect(result).toBe("nomatch");

        });

        it(" Should return good if the password is matching and it has more or equal to 8 characters", function() {

        //  YOUR CODE HERE

        var mock_pass= "johncenack";

        result = helper.validatePasswordMatch(true, mock_pass,mock_pass);

        expect(result).toBe("good");

        });

        it(" Should return empty if the password has not been filled", function() {

        //  YOUR CODE HERE

        var mock_pass= "";

        result = helper.validatePasswordMatch(false, mock_pass,mock_pass);

        expect(result).toBe("empty");

        });
  
  
    });


});

