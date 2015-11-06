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

}

module.exports = alt.createActions(StudyGroupActions);