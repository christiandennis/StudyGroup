var alt = require('../alt');

class MyGroupsActions {
	fetchMyGroups(myGroups) {
		this.dispatch(myGroups);
	}

	fetchUpcomingGroups(upcomingGroups) {
		this.dispatch(upcomingGroups);
	}

	fetchPastGroups(pastGroups) {
		this.dispatch(pastGroups);
	}

	joinOrLeaveGroup(myGroups) {
		this.dispatch(myGroups);
	}

	dismissGroup(studyGroups) {
		this.dispatch(studyGroups);
	}
}

module.exports = alt.createActions(MyGroupsActions);