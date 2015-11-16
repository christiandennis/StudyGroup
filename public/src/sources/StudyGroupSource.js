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
	signUp() {
		return {
		  remote(state, fullname, fullnameSignUp, email, password, confirmPassword, schoolSignUp, usernameSignUp, signUpDialog) { 
		    return new Promise(function (resolve, reject) {
		      // simulate an asynchronous flow where data is fetched on
		      // a remote server somewhere.
		      	var fata = {
		      		"email": email.getValue(),
		      		"password": password.getValue(),
		      		"password_confirmation": confirmPassword.getValue(),
		      		"school": schoolSignUp.getValue(),
          		"name": fullnameSignUp.getValue(),
          		"username": usernameSignUp.getValue()
		      	}
		      	
		      	$.ajax({ url: '/auth',
		      	  type: 'POST',
		      	  beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		      	  data: fata,
		      	  success: function(response) {
	      	  		console.log('-----------signup SUCCESS-----------');
	      	  	  console.log('response:' ,response);
	      	  	  signUpDialog.dismiss();
	      	  	  console.log('---------------------------------');
		      		},
		      	  error: function(response) {
		      	  	console.log('-----------signup FAILED-----------');
	      	  	  console.log('response:' ,response);
	      	  	  console.log('---------------------------------');
		      	  }
		      })  
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
	},

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
		  remote(state,email,password, history, loginDialog) { 
		    return new Promise(function (resolve, reject) {
		      // simulate an asynchronous flow where data is fetched on
		      // a remote server somewhere.
		      var fata = {
		      		"email": email,
		      		"password": password,
		      		"password_confirmation": password
		      }
		      $.ajax({ url: '/auth/sign_in',
		        type: 'POST',
		        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		        data: fata,
		        success: function(response) {
		        	console.log('-----------login SUCCESS-----------');
		          console.log('response:' ,response);
		          console.log('loginDialog', loginDialog);
	          	resolve(response);
	          	history.pushState(null, '/studygroupapp');
	          	loginDialog.dismiss();
	          	console.log('---------------------------------');
		        },
		        error: function(response) {
		        	console.log('-----------login FAILED-----------');
		          console.log('response:' ,response);
		          reject('login FAILED');
		          console.log('---------------------------------');
		        }

		      })
		      
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