// var button = require('react-materialize').Button;
var React = require('react');
var Link = require('react-router').Link;
var render = require('react-dom').render;

var AltContainer = require('alt/AltContainer');
var StudyGroupStore = require('../stores/StudyGroupStore');
var StudyGroupActions = require('../actions/StudyGroupActions');
var ReactTestUtils = require('react-addons-test-utils');

const Paper = require('material-ui/lib/paper');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const moment = require('moment');

const URL = "http://localhost:3000";
var axios = require('axios');

var AllSimpleGroup = React.createClass({
	render() {
			return 	(
					<div>
					  	{this.props.myGroups.map((myGroup, i) => {
							  	var date = moment(myGroup.date).format("ddd, MMM D").toString();
							  	var time = moment(myGroup.date).format("h:mm a").toString();
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
		console.log('----------MY GROUPS---------');
		var state = StudyGroupStore.getState();
		console.log('componentDidMount state', state);
		StudyGroupStore.fetchMyGroups();
	},

	componentWillUpdate() {
		var state = StudyGroupStore.getState();
	},

	render(){
		var state = StudyGroupStore.getState();
		console.log('render state', state);
		if (state.myGroups) {
			return (
				<div>
					<AltContainer store = {StudyGroupStore}>
						<AllSimpleGroup/>
					</AltContainer>
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