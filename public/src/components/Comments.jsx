// import react, react-router, alt
var React = require('react');
var render = require('react-dom').render;
var AltContainer = require('alt/AltContainer');

// import store and action
var StudyGroupStore = require('../stores/StudyGroupStore');
var StudyGroupActions = require('../actions/StudyGroupActions');
var CommentsActions = require('../actions/CommentsActions');

// import components
var Card_MainGroupView = require('./Card_MainGroupView.jsx');

// masonry react
var Masonry = require('react-masonry-component')(React);
var masonryOptions = {
	columnWidth: 550,
    transitionDuration: 0
};

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// import Material UI components
const RaisedButton = require('material-ui/lib/raised-button');
const Paper = require('material-ui/lib/paper');
const Avatar = require('material-ui/lib/avatar');
const Dialog = require('material-ui/lib/dialog');
const RefreshIndicator = require('material-ui/lib/refresh-indicator');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker/time-picker');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardTitle = require('material-ui/lib/card/card-title');
const CardActions = require('material-ui/lib/card/card-actions');
const CardText = require('material-ui/lib/card/card-text');

const moment = require('moment');

const URL = "http://localhost:3000";
var axios = require('axios');

var ReactTestUtils = require('react-addons-test-utils');

var refreshInterval = 10000;


var AllComments = React.createClass({
	render() {
		if (this.props.errorMessage) {
			return (
				<div>{this.props.errorMessage}</div>
			);
		}

		if (this.props.studyGroup.comments){
			var comments = this.props.studyGroup.commentsData;
			console.log('the comments', comments);
			return (
				<div>
					{comments.map((comment, i) => {
						return (

							<Paper zDepth={2} style = {{paddingTop:"20px", marginTop:"30px"}} key={comment.id}>

						    	<div ref="commentBox" className="groupdesc-comment">{comment.content}</div>
						    
						    </Paper>
						)
					})}
				</div>
			);
		}
	}

});

var Comments = React.createClass ({
	componentDidMount: function() {
		StudyGroupStore.fetchComments(this.props.studyGroup.id);	
	},

	render(){
		if (this.props.studyGroup && this.props.studyGroup.commentsData!=null) {
			return (
				<div>
					<AltContainer store = {StudyGroupStore}>

						<div ref="commentTitle" className="groupdesc-comment-title" style={{paddingBottom:"20px"}}>Comments</div>
						<AllComments studyGroup={this.props.studyGroup}/>
						<TextField
					    hintText="New Comment"/>

					</AltContainer>
				</div>
			);
		}
		return (
			<div>
			</div>
		);
	}
});

module.exports = Comments;