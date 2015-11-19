var alt = require('../alt');
var StudyGroupActions = require('../actions/StudyGroupActions');
var MyGroupsActions = require('../actions/MyGroupsActions');
var StudyGroupSource = require('../sources/StudyGroupSource');
var UserActions = require('../actions/UserActions');

const moment = require('moment');

class StudyGroupStore {
	constructor() {
		this.user = null;
		this.errorMessageUser = null;
		this.studyGroups = null;
		this.myGroups = null;


		this.bindListeners({
			handleUpdateStudyGroups: StudyGroupActions.UPDATE_STUDY_GROUPS,
			handleFetchStudyGroups: StudyGroupActions.FETCH_STUDY_GROUPS,
			handleStudyGroupFailed: StudyGroupActions.STUDY_GROUPS_FAILED,

			handleUpdateUser: UserActions.UPDATE_USER,
			handleFetchUser: UserActions.FETCH_USER,
			handleStudyUser: UserActions.USER_FAILED,

			handleSignUp: UserActions.SIGN_UP,
			handleSignOut: UserActions.SIGN_OUT,

			handlePostNewGroup: StudyGroupActions.POST_NEW_GROUP,
			handleRefreshGroups: StudyGroupActions.REFRESH_GROUPS,
			handleEditGroup: StudyGroupActions.EDIT_GROUP,

			handleFetchMyGroups: MyGroupsActions.FETCH_MY_GROUPS
		});


		this.exportPublicMethods({
			getStudyGroup: this.getStudyGroup
		});
		this.exportAsync(StudyGroupSource);
	}

	handleFetchMyGroups(myGroups) {
		this.myGroups = myGroups;
	}

	handleEditGroup(studyGroup) {
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id == studyGroup.id) {
	       		this.studyGroups[i] = studyGroup;
	        	break;
	     	}
	   	}

	   	function compare(a,b) {
		  if (Number(a.date) < Number(b.date))
		    return -1;
		  if (Number(a.date) > Number(b.date))
		    return 1;
		  return 0;
		}


		this.studyGroups.sort(compare);
	}

	handlePostNewGroup() {
		
	}

	handleSignUp() {
		
	}

	handleSignOut() {
		this.user = null;
		this.studyGroups = null;
		this.errorMessage = null;
	}

	handleUpdateStudyGroups(studyGroups){
		this.studyGroups = studyGroups;
		this.errorMessage = null;
	}
	handleFetchStudyGroups() {
	}

	handleStudyGroupFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}

	handleRefreshGroups(studyGroup){

		this.studyGroups.unshift(studyGroup);

		function compare(a,b) {
		  if (Number(a.date) < Number(b.date))
		    return -1;
		  if (Number(a.date) > Number(b.date))
		    return 1;
		  return 0;
		}


		this.studyGroups.sort(compare);
		this.errorMessage = null;
	}

	handleUpdateUser(user){
		this.user = user;
		this.errorMessageUser = null;
	}

	handleFetchUser() {
		this.user = null;
	}
	
	handleStudyUser(errorMessage) {
		this.errorMessage = errorMessage;
	}


	getStudyGroup(id) {
		var {studyGroup} = this.getState();
		for (var i =0; i< studyGroups.length; i+=1) {
			if (studyGroups[i].id===id) {
				return studyGroups[i];
			}
		}
		return null;
	}
}


module.exports = alt.createStore(StudyGroupStore, 'StudyGroupStore');