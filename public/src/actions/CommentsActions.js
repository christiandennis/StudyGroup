var alt = require('../alt');

class CommentsActions {
	fetchComments(comments) {
		this.dispatch(comments);
	}

	postComment(comments) {
		this.dispatch(comments);
	}

}

module.exports = alt.createActions(CommentsActions);