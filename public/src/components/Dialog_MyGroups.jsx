// var button = require('react-materialize').Button;
var React = require('react');
var Link = require('react-router').Link;
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

const URL = "http://localhost:3000";
var axios = require('axios');

var AllSimpleGroup = React.createClass({
	render() {
			return 	(
					<div>
					  	{this.props.myGroups.map((myGroup, i) => {
					  		var d = new Date(0);
					  		d.setUTCSeconds(myGroup.date);

						  	var date = moment(d).format("ddd, MMM D").toString();
						  	var time = moment(d).format("h:mm a").toString();
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
		var state = StudyGroupStore.getState();
		StudyGroupStore.fetchMyGroups();
	},

	componentWillUpdate() {
		var state = StudyGroupStore.getState();
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
				"error"
			</div>
		);
	}
});

module.exports = MyGroups;