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

	postNewGroup() {
		this.dispatch();
	}

	refreshGroups(studyGroups) {
		this.dispatch(studyGroups);
	}
}

module.exports = alt.createActions(StudyGroupActions);