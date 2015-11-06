var StudyGroupActions = require('../actions/StudyGroupActions');
var UserActions = require('../actions/UserActions');

var axios = require('axios');

const URL = "http://localhost:3000"
const userURL = 'https://sheetsu.com/apis/72092a94';
// const groupURL = 'https://sheetsu.com/apis/5964fc68';
const groupURL = URL + "/groups";


var mockData = [
	{id: 0, name: "Theo"},
	{id: 1, name: "Dennis"},
	{id: 2, name: "Dion"}
];

var StudyGroupSource = {
	fetchStudyGroups() {
		return {
		  remote(state) { 
		    return new Promise(function (resolve, reject) {
		      // simulate an asynchronous flow where data is fetched on
		      // a remote server somewhere.
		      axios.get(groupURL)
			  	  .then(function (response) {
			  	  	//data = response from server
			  	  	var data = response.data;
			  	    resolve (data.groups);
			  	  })
			  	  .catch(function (response) {
			  	    console.log(response);
			  	    reject ("StudyGroup API failed");
		  	  });
		      
		    });
		  },

		  local() {
		    // Never check locally, always fetch remotely.
		    return null;
		  },

		  success: StudyGroupActions.updateStudyGroups,
		  error: StudyGroupActions.studyGroupsFailed,
		  loading: StudyGroupActions.fetchStudyGroups
		}
	},

	fetchUser() {
		return {
		  remote(state,email,password) { 
		    return new Promise(function (resolve, reject) {
		      // simulate an asynchronous flow where data is fetched on
		      // a remote server somewhere.
		      axios.get(userURL)
			  	  .then(function (response) {
			  	  	//data = response from server
			  	  	console.log("PASSING VALUE");
			  	  	//PASSED VALUE FROM COMPONENT
			  	  	console.log(email);
			  	  	console.log(password);
			  	  	var data = response.data;
			  	    resolve (data.result);
			  	  })
			  	  .catch(function (response) {
			  	    console.log(response);
			  	    reject ("GADAPET USER TOT");
		  	  });
		      
		    });
		  },

		  local() {
		    // Never check locally, always fetch remotely.
		    return null;
		  },

		  success: UserActions.updateUser,
		  error: UserActions.userFailed,
		  loading: UserActions.fetchUser
		}
	}
};

module.exports = StudyGroupSource;