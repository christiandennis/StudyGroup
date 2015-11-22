var alt = require('../alt');
var StudyGroupActions = require('../actions/StudyGroupActions');
var MyGroupsActions = require('../actions/MyGroupsActions');
var StudyGroupSource = require('../sources/StudyGroupSource');
var UserActions = require('../actions/UserActions');
var CommentsActions = require('../actions/CommentsActions');

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

			handleFetchMyGroups: MyGroupsActions.FETCH_MY_GROUPS,
			handleJoinOrLeaveGroup: MyGroupsActions.JOIN_OR_LEAVE_GROUP,
			handleDismissGroup: MyGroupsActions.DISMISS_GROUP,

			handleFetchComments: CommentsActions.FETCH_COMMENTS,
			handlePostComment: CommentsActions.POST_COMMENT
		});


		this.exportPublicMethods({
			getStudyGroup: this.getStudyGroup
		});
		this.exportAsync(StudyGroupSource);
	}
	
	compare(a,b) {
		if (Number(a.date) < Number(b.date))
		    return -1;
		if (Number(a.date) > Number(b.date))
		    return 1;
		return 0;
	}

	handleFetchComments(data) {
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id === data.groupID) {
	       		this.studyGroups[i].commentsData = data.comments;
	        	break;
	     	}
	   	}
	}

	handleDismissGroup(studyGroupID) {
		for (var i in this.myGroups) {
	     	if (this.myGroups[i].id === studyGroupID) {
	       		this.myGroups.splice(i, 1);
	       		break;
	     	}
	   	}
   		for (var i in this.studyGroups) {
   	     	if (this.studyGroups[i].id === studyGroupID) {
   	       		this.studyGroups.splice(i, 1);
   	       		break;
   	     	}
   	   	}
	}

	handlePostComment(comment) {
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id === comment.groupid) {
	       		this.studyGroups[i].comments.push(comment);
	        	break;
	     	}
	   	}
	}

	handleFetchMyGroups(myGroups) {
		this.myGroups = myGroups;
		this.myGroups.sort(this.compare);
	}

	handleJoinOrLeaveGroup(myGroup) {
		// add the joined group to mygroups
		if(myGroup.joinOrLeave === 'add'){
			var found = false;
			for (var i in this.myGroups) {
		     	if (this.myGroups[i].id === myGroup.groupID) {
		       		found = true
		        	break;
		     	}
		   	}
		   	if (!found){
		   		this.myGroups.push(myGroup.group);
		   	}
		} else { // remove the left group from mygroups
			for (var i in this.myGroups) {
		     	if (this.myGroups[i].id === myGroup.groupID) {
		       		this.myGroups.splice(i, 1);
		       		break;
		     	}
		   	}
		}

		// update the counter/capacity on the card
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id == myGroup.groupID) {
	       		this.studyGroups[i] = myGroup.group;
	        	break;
	     	}
	   	}

	   	this.myGroups.sort(this.compare);
	}

	handleEditGroup(studyGroup) {
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id == studyGroup.id) {
	       		this.studyGroups[i] = studyGroup;
	        	break;
	     	}
	   	}

		this.studyGroups.sort(this.compare);
	}

	handlePostNewGroup(studyGroup) {
		this.studyGroups.unshift(studyGroup);
		this.studyGroups.sort(this.compare);

		this.myGroups.unshift(studyGroup);
		this.myGroups.sort(this.compare);

		this.errorMessage = null;
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
		this.studyGroups.sort(this.compare);
		this.errorMessage = null;
	}

	handleFetchStudyGroups() {
	}

	handleStudyGroupFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}

	handleRefreshGroups(studyGroup){
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