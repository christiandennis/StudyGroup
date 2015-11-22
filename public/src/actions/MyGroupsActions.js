var alt = require('../alt');

class MyGroupsActions {
	fetchMyGroups(myGroups) {
		this.dispatch(myGroups);
	}

	joinOrLeaveGroup(myGroups) {
		this.dispatch(myGroups);
	}

	dismissGroup(studyGroups) {
		this.dispatch(studyGroups);
	}
}

module.exports = alt.createActions(MyGroupsActions);