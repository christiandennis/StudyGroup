var StudyGroupActions = require('../actions/StudyGroupActions');
var UserActions = require('../actions/UserActions');
var MyGroupsActions = require('../actions/MyGroupsActions');
var CommentsActions = require('../actions/CommentsActions');


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
		  remote(state, history, fullname, fullnameSignUp, email, password, confirmPassword, schoolSignUp, usernameSignUp, signUpDialog, unavailableEmailSnackbar, unavailableUsernameSnackbar, passwordSnackbar, failedSnackbar) { 
		    return new Promise(function (resolve, reject) {
		      	// console.log('--------------SIGN UP--------------');
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
			      	success: function(data, status, xhr) {
		      	  		// console.log('__SUCCESS--');
		      	  	  	// console.log('data:' ,data);
		      	  	  	// console.log('header', xhr);
		      	  	  	signUpDialog.dismiss();
		      	  	  	// console.log('**************END SIGN UP**************');

		      	  	  	// AUTO LOG IN AFTER SIGN UP
      	  	  		    $.ajax({ url: '/auth/sign_in',
      	  	  		        type: 'POST',
      	  	  		        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      	  	  		        data: {
      	  	  		        		"email": email.getValue(),
      	  	  		        		"password": password.getValue()
      	  	  		        		},
      	  	  		        success: function(data, status, xhr) {
      	  	  		        	// console.log('__SUCCESS__');
      	  	  		        	data.data.client = xhr.getResponseHeader('client');
      	  	  		        	data.data.accesstoken = xhr.getResponseHeader('access-token');
      	  	  		        	data.data.uid = xhr.getResponseHeader('uid');
      	  	  		          	// console.log('data' ,data.data);
      	  	  	          	resolve(data.data);
      	  	  	          	setTimeout(function() {history.pushState(null, '/studygroupapp');}, 50);
      	  	  	          	// loginDialog.dismiss();
      	  	  	          	// console.log('**************END LOGIN**************');
      	  	  		        },
      	  	  		        error: function(response) {
      	  	  		        	// console.log('__FAILED__');
      	  	  		          	// console.log('response' ,response);
      	  	  		          	loginFailedSnackbar.show();
      	  	  			        reject('login FAILED');
      	  	  			        // console.log('**************END LOGIN**************');
      	  	  		        }
      	  	  		    });
			      	},
			      	error: function(response) {
			      		// console.log('__FAILED__');
		      	  		// console.log('response:' ,response.responseJSON);
		      	  		if(response.responseJSON.errors[0] === 'Username is taken.'){
		      	  			unavailableUsernameSnackbar.show();
		      	  		} else if(response.responseJSON.errors[0] === "Email is already taken."){
		      	  			unavailableEmailSnackbar.show();
		      	  		} else if (response.responseJSON.errors[0] === "password and password_confirmation does not match"){
		      	  			passwordSnackbar.show();
		      	  		} else {
		      	  			failedSnackbar.show();
		      	  		}
		      	  		// console.log('**************END SIGN UP**************');
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

	// ==================================================
	// Handles user sign in
	// stores client, access-token, uid in the Store
	// ==================================================
	fetchUser() {
		return {
		  remote(state,email,password, history, loginDialog, loginFailedSnackbar, somethingWrong) { 
		    return new Promise(function (resolve, reject) {
		      // console.log('--------------LOGIN--------------');
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
		        	// console.log('__SUCCESS__');
		        	data.data.client = xhr.getResponseHeader('client');
		        	data.data.accesstoken = xhr.getResponseHeader('access-token');
		        	data.data.uid = xhr.getResponseHeader('uid');
		          	// console.log('data' ,data.data);
	          	resolve(data.data);
	          	// history.pushState(null, '/studygroupapp');
	          	setTimeout(function() {history.pushState(null, '/studygroupapp');}, 10);
	          	// loginDialog.dismiss();
	          	// console.log('**************END LOGIN**************');
		        },
		        error: function(response) {
		        	// console.log('__FAILED__');
		          	// console.log('response' ,response);
		          	if(response.responseJSON.errors[0] === "Invalid login credentials. Please try again."){
		          		loginFailedSnackbar.show();	
		          	} else {
		          		somethingWrong.show();
		          	}
			        reject('login FAILED');
			        // console.log('**************END LOGIN**************');
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
		  remote(state, history) { 
		    return new Promise(function (resolve, reject) {
		    		// console.log('--------------SIGN OUT--------------');
		      	$.ajax({ url: '/auth/sign_out',
      	      type: 'DELETE',
      	      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      	      headers: 	{
		      	      				"access-token": state.user.accesstoken,
		      	      				"client": state.user.client,
		      	      				"uid": state.user.uid
      	      					},
      	      success: function(response) {
      	      	// console.log('__SUCCESS__');
	      	  	  // console.log('response:' ,response);
      	        window.location.href = '/';
      	        // history.pushState(null, '/');
      	        // console.log('**************END SIGN OUT**************');
      	      },
      	      error: function(response) {
      	      	// console.log('__FAILED__');
      	      	// User was not found or was not logged in.
	      	  	  // console.log('response:' ,response.responseJSON);
	      	  	  if (response.responseJSON.errors[0] === 'User was not found or was not logged in.') {
	      	  	  	window.location.href = '/';
	      	  	  }
	      	  	  // console.log('**************END SIGN OUT**************');
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
	// **************************** STUDY GROUPS (FEED) ***************************
	// ****************************************************************************
	// ****************************************************************************

	// ==================================================
	// This function handles posting new groups
	// Takes in title, subject, description, date, location, capacity, host, school, privacy, uid, accesstoken, client, history, newGroupDialog
	// requires authentication
	// ==================================================
	postNewGroup() {
		return {
		  remote(state, title, subject, description, date, location, capacity, privacy, newGroupDialog, failedSnackbar, successSnackbar) { 
		    return new Promise(function (resolve, reject) {
		      	// console.log('--------------POST NEW GROUP--------------');
		      	// console.log("postnewgroupstate", state);
		      	var groupData = {
		      		"title": title.getValue(),
	      			"subject": subject.getValue(),
	      			"description": description.getValue(),
	      			"date": date, 
	      			"location": location.getValue(),
	      			"capacity": capacity.getValue(),
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
      	      	// console.log('__SUCCESS__');
	      	  	  // console.log('response:' ,response);
	      	  	  resolve(response.group);
	      	  	  newGroupDialog.dismiss();
	      	  	  successSnackbar.show();
	      	  	  // console.log('**************END POST NEW GROUP**************');
      	      },
      	      error: function(response) {
      	      	// console.log('__FAILED__');
      	      	// User was not found or was not logged in.
	      	  	  // console.log('response:' ,response.responseJSON);
	      	  	  failedSnackbar.show();
	      	  	  // console.log('**************END POST NEW GROUP**************');
      	      }
      	    }); 
		    });
		  },

		  local() {
		    // Never check locally, always fetch remotely.
		    return null;
		  },
		  
		  success: StudyGroupActions.postNewGroup,
		  error: StudyGroupActions.studyGroupsFailed
		}
	},

	editGroup() {
		return {
		  	remote(state, id, title, subject, description, date, location, capacity, editGroupDialog, failedSnackbar, successSnackbar) { 
			    return new Promise(function (resolve, reject) {
			      	// console.log('--------------EDIT GROUP--------------');
			      	var groupData = {
			      		"title": title.getValue(),
		      			"subject": subject.getValue(),
		      			"description": description.getValue(),
		      			"date": date, 
		      			"location": location.getValue(),
		      			"capacity": capacity.getValue(),
		      			"id": id
			      	};
			      	var URL = '/groups/' + id;
			      	$.ajax({ url: URL,
		      	      	type: 'PUT',
		      	      	beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		      	      	headers:{
		      	      				"access-token": state.user.accesstoken,
		      	      				"client": state.user.client,
		      	      				"uid": state.user.uid
		      	      			},
			      	    data: groupData,
			      	    success: function(response) {
			      	      // 	console.log('__SUCCESS__');
			      	  	  	// console.log('response:' ,response);
			      	  	  	// history.pushState(null, '/studygroupapp');
			      	  	  	resolve(response.group);
			      	  	  	editGroupDialog.dismiss();
			      	  	  	successSnackbar.show();
			      	  	  	// console.log('**************END EDIT GROUP**************');
		      	      	},
		      	      	error: function(response) {
			      	    //   	console.log('__FAILED__');
				      	  	// console.log('response:' ,response.responseJSON);
				      	  	failedSnackbar.show();
				      	  	// console.log('**************END EDIT GROUP**************');
		      	      	}
	      	    	});
			    });
			},

		  local() {
		    // Never check locally, always fetch remotely.
		    return null;
		  },
		  
		  success: StudyGroupActions.editGroup,
		  error: StudyGroupActions.studyGroupsFailed
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
			    	// console.log('--------------FETCH GROUP--------------');
			      	$.ajax({ url: '/groups/user/index',
				        type: 'GET',
				        headers: {
				  						"access-token": state.user.accesstoken,
			    	      				"client": state.user.client,
			    	      				"uid": state.user.uid
			  								},
				        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
				        success: function(data, status, xhr) {
				        	// console.log('__SUCCESS__');
					        // console.log('groups' ,data.groups);
					        resolve(data.groups);
					        // console.log('**************END FETCH GROUP**************');
				        },
				        error: function(response) {
				        	// console.log('__FAILED__');
				         //  	console.log('response' ,response);
				          	reject('fetch group FAILED');
				          	// console.log('**************END FETCH GROUP**************');
				        }
			      	});
			    });
			},

			local() {
			    // Never check locally, always fetch remotely.
			    return null;
			},

			success: StudyGroupActions.updateStudyGroups,
			error: StudyGroupActions.studyGroupsFailed

		}
	}, 

	searchGroups() {
		return {
			remote(state, searchTerm) { 
			    return new Promise(function (resolve, reject) {
			    	// console.log('--------------SEARCH GROUP--------------');
			    	if(searchTerm===''){
			    		resolve(null);

			    	} else {
				      	$.ajax({ url: '/groups/search?search=' + searchTerm,
					        type: 'GET',
					        headers: {
					  						"access-token": state.user.accesstoken,
				    	      				"client": state.user.client,
				    	      				"uid": state.user.uid
				  								},
					        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
					        success: function(data, status, xhr) {
					        	// console.log('__SUCCESS__');
						        // console.log('data' ,data);
						        resolve(data.group);
						        // console.log('**************SEARCH GROUP**************');
					        },
					        error: function(response) {
					        	// console.log('__FAILED__');
					         //  	console.log('response' ,response);
					          	// reject('fetch group FAILED');
					          	// console.log('**************SEARCH GROUP**************');
					        }
				      	});
				    }
			    });
			},

			local() {
			    // Never check locally, always fetch remotely.
			    return null;
			},

			success: StudyGroupActions.searchGroups

		}
	},

	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************

	// ****************************************************************************
	// ****************************************************************************
	// ****************************** MY STUDY GROUPS *****************************
	// ****************************************************************************
	// ****************************************************************************

	fetchMyGroups() {
		return {
			remote(state){
				return new Promise(function(resolve, reject){
					// console.log('--------------FETCH MY GROUPS--------------');
				    $.ajax({ url: '/groups/user',
				        type: 'GET',
				        headers: {
					  				"access-token": state.user.accesstoken,
		    	      				"client": state.user.client,
		    	      				"uid": state.user.uid
		  						},
				        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
				        success: function(data, status, xhr) {
				        	// console.log('__SUCCESS__');
					        // console.log('groups' ,data.groups);
					        resolve(data.groups);
					        // console.log('**************END FETCH MY GROUPS**************');
				        },
				        error: function(response) {
				        	// console.log('__FAILED__');
				          // console.log('response' ,response);
				          reject('fetch group FAILED');
				          // console.log('**************END FETCH MY GROUPS**************');
				        }
				    })
				})
			},
			local() {
				return null;
			},
			success: MyGroupsActions.fetchMyGroups
		}
	},

	joinOrLeaveGroup() {
		return {
			remote(state, groupID, joinOrLeave){
				return new Promise(function(resolve, reject){
					// console.log('--------------JOIN OR LEAVE GROUP--------------');
				    $.ajax({ url: '/groups/user/update',
				        type: 'PUT',
				        headers: {
					  				"access-token": state.user.accesstoken,
		    	      				"client": state.user.client,
		    	      				"uid": state.user.uid
		  						},
		  				data: 	{
		  							"groupid": groupID,
		  							"command": joinOrLeave
		  						},
				        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
				        success: function(data, status, xhr) {
				        	// console.log('__SUCCESS__');
					        // console.log('data' ,data);
					        var groupData = {
					        					"group": data.going,
					        					"groupID": groupID,
					        					"joinOrLeave": joinOrLeave
					        				};
					        resolve(groupData);
					        // console.log('**************ENDJOIN OR LEAVE GROUP**************');
				        },
				        error: function(response) {
				        	// console.log('__FAILED__');
				          	// console.log('response' ,response);
				          	// reject('fetch group FAILED');
				          	// console.log('**************END JOIN OR LEAVE GROUP**************');
				        }
				    })
				})
			},
			local() {
				return null;
			},
			success: MyGroupsActions.joinOrLeaveGroup
		}
	},

	dismissGroup() {
		return {
			remote(state, groupID){
				return new Promise(function(resolve, reject){
					// console.log('--------------DISMISS GROUP--------------');
				    $.ajax({ url: '/groups/delete',
				        type: 'DELETE',
				        headers: {
					  				"access-token": state.user.accesstoken,
		    	      				"client": state.user.client,
		    	      				"uid": state.user.uid
		  						},
		  				data: 	{
		  							"id": groupID
		  						},
				        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
				        success: function(data, status, xhr) {
				        	// console.log('__SUCCESS__');
					        // console.log('data' ,data);
					        resolve(groupID);
					        // console.log('**************DISMISS GROUP**************');
				        },
				        error: function(response) {
				        	// console.log('__FAILED__');
				          	// console.log('response' ,response);
				          	// reject('fetch group FAILED');
				          	// console.log('**************DISMISS GROUP**************');
				        }
				    })
				})
			},
			local() {
				return null;
			},
			success: MyGroupsActions.dismissGroup
		}
	},

	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************
	// ****************************************************************************

	// ****************************************************************************
	// ****************************************************************************
	// ******************************* COMMENTS ***********************************
	// ****************************************************************************
	// ****************************************************************************

	fetchComments() {
		return {
			remote(state, groupID){
				return new Promise(function(resolve, reject){
					// console.log('--------------COMMENTS--------------');
				    $.ajax({ url: '/comments/' + groupID.toString(),
				        type: 'GET',
				        headers: {
					  				"access-token": state.user.accesstoken,
		    	      				"client": state.user.client,
		    	      				"uid": state.user.uid
		  						},
				        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
				        success: function(data, status, xhr) {
				        	// console.log('__SUCCESS__');
					        // console.log('data' ,data);
					        var comment = {
					        					"comments": data.comments,
					        					"groupID": groupID,
					        				};
					        // console.log('comments', comment);
					        resolve(comment);
					        // console.log('**************END COMMENTS**************');
				        },
				        error: function(response) {
				        	// console.log('__FAILED__');
				          	// console.log('response' ,response);
				          	// reject('fetch group FAILED');
				          	// console.log('**************END COMMENTS**************');
				        }
				    })
				})
			},
			local() {
				return null;
			},
			success: CommentsActions.fetchComments
		}
	},

	postComment() {
		return {
			remote(state, groupID, content){
				return new Promise(function(resolve, reject){
					// console.log('--------------POST COMMENTS--------------');
				    $.ajax({ url: '/comment',
				        type: 'POST',
				        headers: {
					  				"access-token": state.user.accesstoken,
		    	      				"client": state.user.client,
		    	      				"uid": state.user.uid
		  						},
		  				data: {
		  							"groupid": groupID,
		  							"title": "Default title",
		  							"content": content.getValue()
		  						},
				        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
				        success: function(data, status, xhr) {
				        	// console.log('__SUCCESS__');
					        // console.log('data' ,data);
					        // console.log('comments', comment);
					        resolve(data.comment);
					        content.setValue("");
					        // console.log('**************END POST COMMENTS**************');
				        },
				        error: function(response) {
				        	// console.log('__FAILED__');
				          	// console.log('response' ,response);
				          	// reject('fetch group FAILED');
				          	// console.log('**************END POST COMMENTS**************');
				        }
				    })
				})
			},
			local() {
				return null;
			},
			success: CommentsActions.postComment
		}
	}

	
};

module.exports = StudyGroupSource;