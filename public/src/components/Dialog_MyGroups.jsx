// var button = require('react-materialize').Button;
var React = require('react');
var render = require('react-dom').render;

var AltContainer = require('alt/AltContainer');
var StudyGroupStore = require('../stores/StudyGroupStore');
var StudyGroupActions = require('../actions/StudyGroupActions');
var ReactTestUtils = require('react-addons-test-utils');

const Paper = require('material-ui/lib/paper');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const moment = require('moment');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const refreshInterval = 10000;

var AllSimpleGroup = React.createClass({

	getTimeString(time) {
		var d = new Date(0);
		d.setUTCSeconds(Number(time));
		return moment(d).format("h:mm a").toString();
	},

	getDateString(date) {
		var d = new Date(0);
		d.setUTCSeconds(Number(date));
		return moment(d).format("ddd, MMM D").toString();
	},

	render() {
		return 	(
			<div>
			  	{this.props.myGroups.map((myGroup, i) => {
				  	var date = this.getDateString(studyGroup.date);
					var time = this.getTimeString(studyGroup.date);
				    return (
				    	<div key={myGroup.id}>
		    		        <Paper>
		    		        	<div className="groupdesc-title">Class</div>
		    		        	<div className="groupdesc-subtitle">{myGroup.subject}</div>

		    		        	<div className="groupdesc-title">Title</div>
		    		        	<div className="groupdesc-subtitle">{myGroup.title}</div>

		    		        	<div className="groupdesc-title">Time</div>
		    		        	<div className="groupdesc-subtitle">{time}</div>

		    		        	<div className="groupdesc-title">Date</div>
		    		        	<div className="groupdesc-subtitle">{date}</div>

		    		        	<div className="groupdesc-title">Location</div>
		    		        	<div className="groupdesc-subtitle">{myGroup.location}</div>
		    		        </Paper>
				    	</div>
				    );
				})
			  	}
			</div>
		)
	}
});

var MyGroups = React.createClass ({
	componentDidMount() {
		StudyGroupStore.fetchMyGroups();
		setInterval(function() {StudyGroupStore.fetchMyGroups();} , refreshInterval);
	},

	closeMygroupsDialog() {
		this.refs.myGroupsDialog.dismiss();
	},

	render(){
		var state = StudyGroupStore.getState();
		if (state.myGroups) {
			return (
				<div>
					<Dialog ref="myGroupsDialog"
							autoDetectWindowHeight={true}
	  						autoScrollBodyContent={true}
	  						modal={true}
	  						actions={[
									  <FlatButton
									    label="Dismiss"
									    secondary={true}
									    onTouchTap={this.closeMygroupsDialog} />,
								  	]}>
						<AltContainer store = {StudyGroupStore}>
							<AllSimpleGroup/>
						</AltContainer>
					</Dialog>
				</div>
			);
		}
		return (
			<div>
			</div>
		);
	}
});

module.exports = MyGroups;