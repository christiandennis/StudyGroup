var StudyGroupActions = require('../actions/StudyGroupActions');
var UserActions = require('../actions/UserActions');

const URL = "http://localhost:3000"
const userURL = 'https://sheetsu.com/apis/72092a94';
const groupURL = URL + "/groups";


var StudyGroupSource = {
	// ****************************************************************************
	// ****************************************************************************
	// ******************************* ATHENTICATIONS *****************************
	// ****************************************************************************
	// ****************************************************************************

	// ==================================================
	// This function handles signup
	// simply make a post request to the server
	// ==================================================
	signUp() {
		return {
		  remote(state, fullname, fullnameSignUp, email, password, confirmPassword, schoolSignUp, usernameSignUp, signUpDialog) { 
		    return new Promise(function (resolve, reject) {
		      	console.log('--------------SIGN UP--------------');
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
	      	  		console.log('__SUCCESS--');
	      	  	  console.log('response:' ,response);
	      	  	  signUpDialog.dismiss();
	      	  	  console.log('**************END SIGN UP**************');
		      		},
		      	  error: function(response) {
		      	  	console.log('__FAILED__');
	      	  	  console.log('response:' ,response);
	      	  	  console.log('**************END SIGN UP**************');
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

	// ==================================================
	// Handles user sign in
	// stores client, access-token, uid in the Store
	// ==================================================
	fetchUser() {
		return {
		  remote(state,email,password, history, loginDialog) { 
		    return new Promise(function (resolve, reject) {
		      console.log('--------------LOGIN--------------');
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
		        	console.log('__SUCCESS__');
		        	data.data.client = xhr.getResponseHeader('client');
		        	data.data.accesstoken = xhr.getResponseHeader('access-token');
		        	data.data.uid = xhr.getResponseHeader('uid');
		          console.log('data' ,data.data);
	          	resolve(data.data);
	          	// history.pushState(null, '/studygroupapp');
	          	setTimeout(function() {history.pushState(null, '/studygroupapp');}, 10);
	          	loginDialog.dismiss();
	          	console.log('**************END LOGIN**************');
		        },
		        error: function(response) {
		        	console.log('__FAILED__');
		          console.log('response' ,response);
		          reject('login FAILED');
		          console.log('**************END LOGIN**************');
		        }
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
	},

	// ==================================================
	// Handles sign out
	// It makes a sign out request to the server
	// and redirect to homepage
	// requires authentication
	// ==================================================
	signOut() {
		return {
		  remote(state, uid, accesstoken, client, history) { 
		    return new Promise(function (resolve, reject) {
		    		console.log('--------------SIGN OUT--------------');
		      	$.ajax({ url: '/auth/sign_out',
      	      type: 'DELETE',
      	      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      	      headers: 	{
		      	      				"access-token": state.user.accesstoken,
		      	      				"client": state.user.client,
		      	      				"uid": state.user.uid
      	      					},
      	      success: function(response) {
      	      	console.log('__SUCCESS__');
	      	  	  console.log('response:' ,response);
      	        window.location.href = URL;
      	        // history.pushState(null, '/');
      	        console.log('**************END SIGN OUT**************');
      	      },
      	      error: function(response) {
      	      	console.log('__FAILED__');
      	      	// User was not found or was not logged in.
	      	  	  console.log('response:' ,response.responseJSON);
	      	  	  if (response.responseJSON.errors[0] === 'User was not found or was not logged in.') {
	      	  	  	window.location.href = URL;
	      	  	  }
	      	  	  console.log('**************END SIGN OUT**************');
      	      }
      	    });
		    });
		  },

		  local() {
		    // Never check locally, always fetch remotely.
		    return null;
		  },
		  success: UserActions.signOut,
		  error: UserActions.signOut,
		  loading: UserActions.signOut
		}
	},
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************

	// ****************************************************************************
	// ****************************************************************************
	// ******************************** STUDY GROUPS ******************************
	// ****************************************************************************
	// ****************************************************************************

	// ==================================================
	// This function handles posting new groups
	// Takes in title, subject, description, date, location, capacity, host, school, privacy, uid, accesstoken, client, history, newGroupDialog
	// requires authentication
	// ==================================================
	postNewGroup() {
		console.log("postNewGroup here");
		return {
		  remote(state, title, subject, description, date, location, capacity, host, school, privacy, history, newGroupDialog) { 
		    return new Promise(function (resolve, reject) {
		      	console.log('--------------POST NEW GROUP--------------');
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
      	      	console.log('__SUCCESS__');
	      	  	  console.log('response:' ,response);
	      	  	  // history.pushState(null, '/studygroupapp');
	      	  	  resolve(response.group);
	      	  	  newGroupDialog.dismiss();
	      	  	  console.log('**************END POST NEW GROUP**************');
      	      },
      	      error: function(response) {
      	      	console.log('__FAILED__');
      	      	// User was not found or was not logged in.
	      	  	  console.log('response:' ,response.responseJSON);
	      	  	  console.log('**************END POST NEW GROUP**************');
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
	
	// ==================================================
	// This function fetches the studygroups
	// The resulting studygroups depend on the passed parameter!
	// requires authentication
	// ==================================================
	fetchStudyGroups() {
		return {
		  remote(state) { 
		    return new Promise(function (resolve, reject) {
		    	console.log('--------------FETCH GROUP--------------');
		      $.ajax({ url: '/groups/user/index',
		        type: 'GET',
		        headers: {
			  								"access-token": state.user.accesstoken,
		    	      				"client": state.user.client,
		    	      				"uid": state.user.uid
		  								},
		        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		        success: function(data, status, xhr) {
		        	console.log('__SUCCESS__');
			        console.log('groups' ,data.groups);
			        resolve(data.groups);
			        console.log('**************END FETCH GROUP**************');
		        },
		        error: function(response) {
		        	console.log('__FAILED__');
		          console.log('response' ,response);
		          reject('fetch group FAILED');
		          console.log('**************END FETCH GROUP**************');
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
	}

	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************

	
};

module.exports = StudyGroupSource;