var alt = require('../alt');
var StudyGroupActions = require('../actions/StudyGroupActions');
var StudyGroupSource = require('../sources/StudyGroupSource');
var UserActions = require('../actions/UserActions');

class StudyGroupStore {
	constructor() {
		this.user = null;
		this.errorMessageUser = null;


		this.bindListeners({
			handleUpdateStudyGroups: StudyGroupActions.UPDATE_STUDY_GROUPS,
			handleFetchStudyGroups: StudyGroupActions.FETCH_STUDY_GROUPS,
			handleStudyGroupFailed: StudyGroupActions.STUDY_GROUPS_FAILED,
			handleUpdateUser: UserActions.UPDATE_USER,
			handleFetchUser: UserActions.FETCH_USER,
			handleStudyUser: UserActions.USER_FAILED
		});


		this.exportPublicMethods({
			getStudyGroup: this.getStudyGroup
		});
		this.exportAsync(StudyGroupSource);
	}

	handleUpdateStudyGroups(studyGroups){
		this.studyGroups = studyGroups;
		this.errorMessage = null;
	}
	handleFetchStudyGroups() {
		this.studyGroups = [];
	}
	handleStudyGroupFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}

	handleUpdateUser(user){
		this.user = user;
		this.errorMessageUser = null;
	}

	handleFetchUser() {
		this.user = null;
		this.username = null;
		this.email = null;
		this.id = null;
		this.name = null;
		this.school = null;
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