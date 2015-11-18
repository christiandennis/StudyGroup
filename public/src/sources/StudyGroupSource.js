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
	// This function handles posting new groups
	// Takes in title, subject, description, date, location, capacity, host, school, privacy, uid, accesstoken, client, history, newGroupDialog
	postNewGroup() {
		console.log("postNewGroup here");
		return {
		  remote(state, title, subject, description, date, location, capacity, host, school, privacy, history, newGroupDialog) { 
		    return new Promise(function (resolve, reject) {
		      // simulate an asynchronous flow where data is fetched on
		      // a remote server somewhere.
		      	console.log("postnewgroupstate", state);
		      	var groupData = {
		      		"title": title.getValue(),
	      			"subject": subject.getValue(),
	      			"description": description.getValue(),
	      			"date": date.getDate(), 
	      			"location": location.getValue(),
	      			"capacity": capacity.getValue(),
	      			"host": host,
	      			"school": school,
	      			"privacy": privacy
		      	}
		      	
		      	$.ajax({ url: '/groups',
      	      type: 'POST',
      	      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      	      headers: 	{
      	      				"access-token": state.user.accesstoken,
      	      				"client": state.user.client,
      	      				"uid": state.user.uid
      	      			},
      	      data: groupData,
      	      success: function(response) {
      	      	console.log('-----------post new group SUCCESS-----------');
	      	  	  console.log('response:' ,response);
	      	  	  // history.pushState(null, '/studygroupapp');
	      	  	  resolve(response.group);
	      	  	  newGroupDialog.dismiss();
      	        console.log('---------------------------------');
      	      },
      	      error: function(response) {
      	      	console.log('-----------post new group FAILED-----------');
      	      	// User was not found or was not logged in.
	      	  	  console.log('response:' ,response.responseJSON);
      	        console.log('---------------------------------');
      	      }
      	    }); 
		    });
		  },

		  local() {
		    // Never check locally, always fetch remotely.
		    return null;
		  },
		  
		  success: StudyGroupActions.refreshGroups,
		  error: StudyGroupActions.studyGroupsFailed2,
		  loading: StudyGroupActions.fetchStudyGroups
		}
	},

	// This function handles sign out
	// It makes a sign out request to the server
	// and redirect to homepage
	signOut() {
		return {
		  remote(state, uid, accesstoken, client, history) { 
		    return new Promise(function (resolve, reject) {
		      	$.ajax({ url: '/auth/sign_out',
      	      type: 'DELETE',
      	      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      	      headers: 	{
		      	      				"access-token": state.user.accesstoken,
		      	      				"client": state.user.client,
		      	      				"uid": state.user.uid
      	      					},
      	      success: function(response) {
      	      	console.log('-----------signout SUCCESS-----------');
	      	  	  console.log('response:' ,response);
      	        window.location.href = URL;
      	        // history.pushState(null, '/');
      	        console.log('---------------------------------');
      	      },
      	      error: function(response) {
      	      	console.log('-----------signout FAILED-----------');
      	      	// User was not found or was not logged in.
	      	  	  console.log('response:' ,response.responseJSON);
	      	  	  if (response.responseJSON.errors[0] === 'User was not found or was not logged in.') {
	      	  	  	window.location.href = URL;
	      	  	  }
      	        console.log('---------------------------------');
      	      }
      	    }); 
		    });
		  },

		  local() {
		    // Never check locally, always fetch remotely.
		    return null;
		  },
		}
	},

	// This function handles signup
	// The complete process is as follow
	// signUp => signIn => updateUser => logOut
	signUp() {
		return {
		  remote(state, fullname, fullnameSignUp, email, password, confirmPassword, schoolSignUp, usernameSignUp, signUpDialog) { 
		    return new Promise(function (resolve, reject) {
		      // simulate an asynchronous flow where data is fetched on
		      // a remote server somewhere.
		      	var signUpData = {
		      		"email": email.getValue(),
		      		"password": password.getValue(),
		      		"password_confirmation": confirmPassword.getValue(),
		      		"school": schoolSignUp.getValue(),
	          		"name": fullnameSignUp.getValue(),
	          		"nickname": usernameSignUp.getValue()
		      	} 	
		      	$.ajax({ url: '/auth',
		      	  type: 'POST',
		      	  beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		      	  data: signUpData,
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
		}
	},

	// This function fetches the studygroups
	// The resulting studygroups depend on the passed parameter!
	// Parameter:
	//		- Type: which data 
	fetchStudyGroups() {
		return {
		  // remote(state, accesstoken, client, uid) { 
		  remote(state) { 
		  	console.log('---------fetch group START----------');
		  	console.log('state: ', state);
		  	console.log('------------------------------------')
		    return new Promise(function (resolve, reject) {
		      $.ajax({ url: '/groups',
		        type: 'GET',
		        headers: 	{
        						// "access-token": accesstoken,
        						// "client": client,
        						// "uid": uid
        						"access-token": "qYO3pGwd1rbybYS6ebbAqA",
        						"client": "NV2CbKG_ZiijqfsqsrGqRw",
        						"uid": "papa@gmail.com"
        					},
		        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		        success: function(data, status, xhr) {
		        	console.log('-----------fetch group SUCCESS-----------');
			         console.log('groups:' ,data.groups);
			         resolve(data.groups);
		          	console.log('---------------------------------');
		        },
		        error: function(response) {
		        	console.log('-----------fetch group FAILED-----------');
		          console.log('response:' ,response);
		          reject('fetch group FAILED');
		          console.log('---------------------------------');
		        }

		      })
		      
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
		        success: function(data, status, xhr) {
		        	console.log('-----------login SUCCESS-----------');
		        	data.data.client = xhr.getResponseHeader('client');
		        	data.data.accesstoken = xhr.getResponseHeader('access-token');
		        	data.data.uid = xhr.getResponseHeader('uid');
		          console.log('data:' ,data.data);
	          	resolve(data.data);
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