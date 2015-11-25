var helper = require('../helper/Helper_Card.js');


const moment = require('moment');

sg = {
      "id": 1,
      "title": "bro",
      "subject": "bububu",
      "description": "bobobobo",
      "date": "1448006126",
      "location": "Brok",
      "school": "UC Berkeley",
      "capacity": 1000,
      "guestlist": 1,
      "privacy": 0,
      "host": "theaidorus",
      "created_at": "2015-11-21T08:40:15.244Z",
      "updated_at": "2015-11-21T08:40:15.244Z",
      "users": [
        {
          "id": 1,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "theaidorus",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        }
      ],
      "comments": [
        {
          "id": 7,
          "userid": "1",
          "groupid": 1,
          "content": "asdf",
          "title": "bibi",
          "created_at": "2015-11-21T08:47:57.814Z",
          "updated_at": "2015-11-21T08:47:57.814Z",
          "users": [
            {
              "id": 1,
              "provider": "email",
              "uid": "papa@gmail.com",
              "name": "Theodorus",
              "nickname": "theaidorus",
              "image": null,
              "email": "papa@gmail.com",
              "school": "UC Berkeley",
              "created_at": "2015-11-21T08:39:47.458Z",
              "updated_at": "2015-11-21T08:39:56.601Z"
            }
          ]
        }
      ]
};


sg_2 = {
      "id": 1,
      "title": "bro",
      "subject": "bububu",
      "description": "bobobobo",
      "date": "144",
      "location": "Brok",
      "school": "UC Berkeley",
      "capacity": 10,
      "guestlist": 10,
      "privacy": 0,
      "host": "theaidorus",
      "created_at": "2015-11-21T08:40:15.244Z",
      "updated_at": "2015-11-21T08:40:15.244Z",
      "users": [
        {
          "id": 1,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "theaidorus",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        }
      ],
      "comments": [
        {
          "id": 7,
          "userid": "1",
          "groupid": 1,
          "content": "asdf",
          "title": "bibi",
          "created_at": "2015-11-21T08:47:57.814Z",
          "updated_at": "2015-11-21T08:47:57.814Z",
          "users": [
            {
              "id": 1,
              "provider": "email",
              "uid": "papa@gmail.com",
              "name": "Theodorus",
              "nickname": "theaidorus",
              "image": null,
              "email": "papa@gmail.com",
              "school": "UC Berkeley",
              "created_at": "2015-11-21T08:39:47.458Z",
              "updated_at": "2015-11-21T08:39:56.601Z"
            }
          ]
        }
      ]
};

// describe("validSubject", function () {
//   it("should multiply 2 and 3", function () {
//     var isValid = helper.isValidSubject('234567893456789');
//     expect(isValid).toBe('valid');
//   });
// });


//  TIME TESTING SECTION

describe(" --* Card Time Testing *-- ", function() {


  	describe("Testing Function calculateTimeColor", function () {


      	it("Should return an string", function() {

     		//  YOUR CODE HERE

     		var mock_date = new Date().toString();

      	calc_time = helper.calculateTimeColor(mock_date,mock_date);

      	expect(typeof calc_time).toBe(typeof "asd");

      	});

        it("Should return string: 'colorBarGreen' if input date more than 3 days from now", function() {

        //  YOUR CODE HERE

        var curr_date = new Date();
        curr_epoch = moment(curr_date).unix();
        three_days = curr_epoch + 259200;

        var mock_date = new Date(0);
        mock_date.setUTCSeconds(three_days);
        date_string = mock_date.toString();

        calc_time = helper.calculateTimeColor(date_string,date_string);

        expect(calc_time).toBe("colorBarGreen");

        });

        it("Should return string: 'colorBarYellow' if input date less than 3 days and more than a day from now", function() {

        //  YOUR CODE HERE

        var curr_date = new Date();
        curr_epoch = moment(curr_date).unix();
        three_days = curr_epoch + 90000;

        var mock_date = new Date(0);
        mock_date.setUTCSeconds(three_days);
        date_string = mock_date.toString();

        calc_time = helper.calculateTimeColor(date_string,date_string);

        expect(calc_time).toBe("colorBarYellow");

        });

        it("Should return string: 'colorBarRed' if input date less than a day from now", function() {

        //  YOUR CODE HERE

        var curr_date = new Date();
        curr_epoch = moment(curr_date).unix();
        three_days = curr_epoch + 1;

        var mock_date = new Date(0);
        mock_date.setUTCSeconds(three_days);
        date_string = mock_date.toString();

        calc_time = helper.calculateTimeColor(date_string,date_string);

        expect(calc_time).toBe("colorBarRed");

        });
	
    });

    describe("Testing Function getTimeString", function () {


        it("Should return an string", function() {

        //  YOUR CODE HERE

        var mock_date = new Date();

        time = helper.getTimeString(mock_date);

        expect(typeof time).toBe(typeof "asd");

        });

        it("It outputs the correct time in the correct h:mm a format", function() {

        //  YOUR CODE HERE

        var mock_date = new Date(0);
        mock_date.setUTCSeconds(1577232000);

        time = helper.getTimeString(mock_date);

        expect(time).toBe("4:00 pm");

        });

  
    });

    describe("Testing Function getDateString", function () {


        it("Should return an string", function() {

        //  YOUR CODE HERE

        var mock_date = new Date();

        date = helper.getDateString(mock_date);

        expect(typeof date).toBe(typeof "asd");

        });

        it("It outputs the correct date in the correct ddd/mmm a format", function() {

        //  YOUR CODE HERE

        var mock_date = new Date(0);
        mock_date.setUTCSeconds(1577232000);

        time = helper.getDateString(mock_date);

        expect(time).toBe("Tue, Dec 24");

        });

  
    });

    describe("Testing Function checkDisabled", function () {


        it("Should return a boolean", function() {

        //  YOUR CODE HERE

        result = helper.checkDisabled(sg);

        expect(typeof result).toBe(typeof false);

        });

        it("It outputs the false if the input studygroup has later time than the current time", function() {

        //  YOUR CODE HERE

        var mock_date = new Date();

        result = helper.checkDisabled(sg)

        expect(result).toBe(false);

        });

        it("It outputs the true if the input studygroup has later time than the current time", function() {

        //  YOUR CODE HERE

        var mock_date = new Date();

        result = helper.checkDisabled(sg_2)

        expect(result).toBe(true);

        });

    });

});


describe(" --* Other Testing *-- ", function() {


    describe("Testing Function checkUserGoing", function () {


        it("Should return a boolean", function() {

        //  YOUR CODE HERE

        user_test = {
          "id": 1,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "theaidorus",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        };

        result = helper.checkUserGoing(sg, user_test);

        expect(typeof result).toBe(typeof false);

        });


        it("Should return true if the input user id is found on the input studygroup ", function() {

        //  YOUR CODE HERE

        user_test = {
          "id": 1,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "theaidorus",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        };

        result = helper.checkUserGoing(sg, user_test);

        expect(result).toBe(true);

        });

        it("Should return false if the input user id is not found on the input studygroup ", function() {

        //  YOUR CODE HERE

        user_test = {
          "id": 1971231293,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "theaidorus",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        };

        result = helper.checkUserGoing(sg, user_test);

        expect(result).toBe(false);

        });
  
    });

    describe("Testing Function getJoinText", function () {


        it("Should return an string", function() {

        user_test = {
          "id": 1971231293,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "theaidorus",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        };

        result = helper.getJoinText(sg, user_test);

        expect(typeof result).toBe(typeof "asd");

        });

        it("Should return string: 'Dismiss' if the user is the host", function() {

        user_test = {
          "id": 1,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "theaidorus",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        };

        result = helper.getJoinText(sg, user_test);

        expect(result).toBe("Dismiss");

        });

        it("Should return string: 'Leave' if the user is not the host and user is already joined the group", function() {

        user_test = {
          "id": 1,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "john cena",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        };

        result = helper.getJoinText(sg, user_test);

        expect(result).toBe("Leave");

        });

        it("Should return string: 'Full' if the user is not the host and user has not already joined the group and the capacity is full", function() {

        user_test = {
          "id": 1123123124,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "john cena",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        };

        result = helper.getJoinText(sg_2, user_test);

        expect(result).toBe("Full");

        });

        it("Should return string: 'join' if the user is not the host and user has not already joined the group and the capacity is not full", function() {

        user_test = {
          "id": 1123123124,
          "provider": "email",
          "uid": "papa@gmail.com",
          "name": "Theodorus",
          "nickname": "john cena",
          "image": null,
          "email": "papa@gmail.com",
          "school": "UC Berkeley",
          "created_at": "2015-11-21T08:39:47.458Z",
          "updated_at": "2015-11-21T08:39:56.601Z"
        };

        result = helper.getJoinText(sg, user_test);

        expect(result).toBe("Join");

        });

  
    });

});

