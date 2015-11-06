var alt = require('../alt');

class UserActions {
	updateUser(user) {
		this.dispatch(user);
	}

	fetchUser() {
		this.dispatch();
	}

	userFailed(errorMessage) {
		this.dispatch(errorMessage);
	}

}

module.exports = alt.createActions(UserActions);