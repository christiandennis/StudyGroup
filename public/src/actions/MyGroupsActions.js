var alt = require('../alt');

class MyGroupsActions {
	fetchMyGroups(myGroups) {
		this.dispatch(myGroups);
	}
}

module.exports = alt.createActions(MyGroupsActions);