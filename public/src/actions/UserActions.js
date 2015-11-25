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

	signUp() {
		this.dispatch();
	}

	signOut() {
		this.dispatch();
	}

	doNothing() {
		
	}

	setUserFromCookie() {
		this.dispatch();
	}
}

module.exports = alt.createActions(UserActions);