jest.autoMockOff();
jest.dontMock('../src/components/Card_MainGroupView.jsx');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');

const moment = require('moment');

const Main = require('../src/components/Card_MainGroupView.jsx');

var studygroup = {};

var studygroup = {
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

describe('Initial test', function() {
 it('This initial test should pass', function() {
   expect(true).toBe(true);
 });
});

describe(' Calculate time color', () => {

    var curr_date = new Date().toString();

    var curr_date_epoch = moment(curr_date).unix();

    var one_year_epoch = 1388534400;

    var one_year_date = new Date(0);

    one_year_date.setUTCSeconds(one_year_epoch);

    var time = ReactTestUtils.renderIntoDocument( 
      <Main studyGroup = {studygroup}/>
      );

    var time_func = Main.MainGroupViewCard.calculateTimeColor(one_year_date)

    // Render a checkbox with label in the document
    // var comment = ReactTestUtils.renderIntoDocument(
    //   <Comments test="this"/>
    // );

    // var commentNode = ReactDOM.findDOMNode(comment);

    // expect(commentNode.textContent).toEqual('');

    // commentNode.refs.commentText.setValue("babibu");

});