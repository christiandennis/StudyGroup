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
		this.upcomingGroups = null;
		this.pastGroups = null;
		this.searchResults = null;
		this.searchTerm = null;
		this.poll = true;


		this.bindListeners({
			handleUpdateStudyGroups: StudyGroupActions.UPDATE_STUDY_GROUPS,
			handleFetchStudyGroups: StudyGroupActions.FETCH_STUDY_GROUPS,
			handleStudyGroupFailed: StudyGroupActions.STUDY_GROUPS_FAILED,

			handleUpdateUser: UserActions.UPDATE_USER,
			handleFetchUser: UserActions.FETCH_USER,
			handleStudyUser: UserActions.USER_FAILED,
			handleSetUserFromCookie: UserActions.SET_USER_FROM_COOKIE,

			handleSignUp: UserActions.SIGN_UP,
			handleSignOut: UserActions.SIGN_OUT,

			handlePostNewGroup: StudyGroupActions.POST_NEW_GROUP,
			handleRefreshGroups: StudyGroupActions.REFRESH_GROUPS,
			handleEditGroup: StudyGroupActions.EDIT_GROUP,

			handleSearchGroups: StudyGroupActions.SEARCH_GROUPS,
			handleEmptySearch: StudyGroupActions.EMPTY_SEARCH,
			handleSetSearchTerm: StudyGroupActions.SET_SEARCH_TERM,

			handleFetchMyGroups: MyGroupsActions.FETCH_MY_GROUPS,
			handleFetchPastGroups: MyGroupsActions.FETCH_PAST_GROUPS,
			handleFetchUpcomingGroups: MyGroupsActions.FETCH_UPCOMING_GROUPS,
			
			handleJoinOrLeaveGroup: MyGroupsActions.JOIN_OR_LEAVE_GROUP,
			handleDismissGroup: MyGroupsActions.DISMISS_GROUP,

			handleFetchComments: CommentsActions.FETCH_COMMENTS,
			handlePostComment: CommentsActions.POST_COMMENT,

			handlePausePolling: StudyGroupActions.PAUSE_SHORT_POLLING,
			handleContinuePolling: StudyGroupActions.CONTINUE_SHORT_POLLING
		});


		this.exportPublicMethods({
			getStudyGroup: this.getStudyGroup
		});
		this.exportAsync(StudyGroupSource);
	}

	handlePausePolling(){
		this.poll = false;
	}

	handleContinuePolling(){
		this.poll = true;
	}

	getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	}

	handleSetUserFromCookie() {
		var userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		this.user = JSON.parse(userCookie);
	}
	
	handleSearchGroups(groups) {
		this.searchResults = groups;
	}

	handleEmptySearch(emptyResult) {
		this.searchResults = emptyResult;
		this.searchTerm = null;
	}

	handleSetSearchTerm(searchTerm) {
		this.searchTerm = searchTerm;
	}

	compare(a,b) {
		if (new Date(a.date) < new Date(b.date))
		    return -1;
		if (new Date(a.date) > new Date(b.date))
		    return 1;
		return 0;
	}

	// unused
	handleFetchComments(data) {
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id === data.groupID) {
	       		this.studyGroups[i].commentsData = data.comments;
	        	break;
	     	}
	   	}
	}

	handleDismissGroup(studyGroupID) {
		for (var i in this.upcomingGroups) {
	     	if (this.upcomingGroups[i].id === studyGroupID) {
	       		this.upcomingGroups.splice(i, 1);
	       		break;
	     	}
	   	}
   		for (var i in this.studyGroups) {
   	     	if (this.studyGroups[i].id === studyGroupID) {
   	       		this.studyGroups.splice(i, 1);
   	       		break;
   	     	}
   	   	}

   	   	if(this.searchResults!=null){
	   		for (var i in this.searchResults) {
		     	if (this.searchResults[i].id == studyGroupID) {
		       		this.searchResults.splice(i, 1);
   	       			break;
		     	}
	   		}
	   	}
	}

	handlePostComment(comment) {
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id === comment.groupid) {
	       		this.studyGroups[i].comments.push(comment);
	     	}
	   	}

	   	for (var i in this.upcomingGroups) {
	     	if (this.upcomingGroups[i].id === comment.groupid) {
	       		this.upcomingGroups[i].comments.push(comment);
	        	break;
	     	}
	   	}

	   	for (var i in this.pastGroups) {
	     	if (this.pastGroups[i].id === comment.groupid) {
	       		this.pastGroups[i].comments.push(comment);
	        	break;
	     	}
	   	}

	   	if(this.searchResults) {
	   		for (var i in this.searchResults) {
		     	if (this.searchResults[i].id === comment.groupid) {
		       		this.searchResults[i].comments.push(comment);
		        	break;
		     	}
	   		}
	   	}
	}

	handleFetchMyGroups(myGroups) {
		this.pastGroups = [];
		this.upcomingGroups = [];

		var curr_epoch = moment(new Date().toString()).unix();

		for (var i in myGroups) {
	     	if (new Date(myGroups[i].date) < new Date()) {
	       		this.pastGroups.push(myGroups[i]);
	     	} else {
	     		this.upcomingGroups.push(myGroups[i]);
	     	}
	   	}
	   	this.upcomingGroups.sort(this.compare);
	   	this.pastGroups.sort(this.compare);
	   	this.pastGroups.reverse();
	}

	handleFetchPastGroups(pastGroups) {
		if (!this.poll){
			return;
		}
		this.pastGroups = pastGroups;
	}

	handleFetchUpcomingGroups(upcomingGroups) {
		if (!this.poll){
			return;
		}
		this.upcomingGroups = upcomingGroups;
	}

	handleJoinOrLeaveGroup(myGroup) {
		// add the joined group to mygroups
		if(myGroup.joinOrLeave === 'add'){
			var found = false;
			for (var i in this.upcomingGroups) {
		     	if (this.upcomingGroups[i].id === myGroup.groupID) {
		       		found = true;
		        	break;
		     	}
		   	}
		   	if (!found){
		   		this.upcomingGroups.push(myGroup.group);
		   	}
		} else { // remove the left group from mygroups
			for (var i in this.upcomingGroups) {
		     	if (this.upcomingGroups[i].id === myGroup.groupID) {
		       		this.upcomingGroups.splice(i, 1);
		       		break;
		     	}
		   	}
		}

		// update the card
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id == myGroup.groupID) {
	       		this.studyGroups[i] = myGroup.group;
	        	break;
	     	}
	   	}

	   	if(this.searchResults!=null){
	   		for (var i in this.searchResults) {
		     	if (this.searchResults[i].id == myGroup.groupID) {
		       		this.searchResults[i] = myGroup.group;
		        	break;
		     	}
	   		}
	   	}

	   	this.upcomingGroups.sort(this.compare);
	}

	handleEditGroup(studyGroup) {
		for (var i in this.studyGroups) {
	     	if (this.studyGroups[i].id == studyGroup.id) {
	       		this.studyGroups[i] = studyGroup;
	        	break;
	     	}
	   	}

	   	if(this.searchResults!=null){
	   		for (var i in this.searchResults) {
		     	if (this.searchResults[i].id == studyGroup.id) {
		       		this.searchResults[i] = studyGroup;
		        	break;
		     	}
	   		}
	   	}

		this.studyGroups.sort(this.compare);
	}

	handlePostNewGroup(studyGroup) {
		this.studyGroups.unshift(studyGroup);
		this.studyGroups.sort(this.compare);

		this.upcomingGroups.unshift(studyGroup);
		this.upcomingGroups.sort(this.compare);

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
		if (!this.poll){
			return;
		}
		this.studyGroups = studyGroups;
		// this.studyGroups.sort(this.compare);
		// var curr_epoch = moment(new Date().toString()).unix();
		// var index;
		// for (var i in this.studyGroups) {
	 //     	if (new Date(this.studyGroups[i].date) >= new Date()) {
	 //       		index = i;
	 //        	break;
	 //     	}
	 //   	}
	 //   	this.studyGroups.splice(0, index);
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