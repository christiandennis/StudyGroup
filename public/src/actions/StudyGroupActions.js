var alt = require('../alt');

class StudyGroupActions {
	updateStudyGroups(studyGroups) {
		this.dispatch(studyGroups);
	}

	fetchStudyGroups() {
		this.dispatch();
	}

	studyGroupsFailed(errorMessage) {
		this.dispatch(errorMessage);
	}

	postNewGroup(studyGroups) {
		this.dispatch(studyGroups);
	}

	refreshGroups(studyGroups) {
		this.dispatch(studyGroups);
	}

	editGroup(studyGroups) {
		this.dispatch(studyGroups);
	}

	searchGroups(searchResults) {
		this.dispatch(searchResults);
	}
}

module.exports = alt.createActions(StudyGroupActions);