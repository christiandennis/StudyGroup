// NOT USED
var alt = require('../alt');
var UserActions = require('../actions/UserActions');
var UserSource = require('../sources/UserSource');

class UserStore {
	constructor() {
		this.user = null;
		this.errorMessage = null;
		this.sessionID = null;

		this.bindListeners({
			handleUpdateUser: UserActions.UPDATE_USER,
			handleFetchUser: UserActions.FETCH_USER,
			handleStudyUser: UserActions.USER_FAILED
		});

		this.exportAsync(UserSource);
	}

	handleUpdateUser(user){
		this.user = user[0].name;
		this.sessionID = user[0].sessionID;
		this.errorMessage = null;
	}

	handleFetchUser() {
		this.user = null;
	}
	
	handleStudyUser(errorMessage) {
		this.errorMessage = errorMessage;
	}



}


module.exports = alt.createStore(UserStore, 'UserStore');