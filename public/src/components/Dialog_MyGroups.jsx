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
const List = require('material-ui/lib/lists/list');
const ListItem = require('material-ui/lib/lists/list-item');
const ListDivider = require('material-ui/lib/lists/list-divider');

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
				  	var date = this.getDateString(myGroup.date);
					var time = this.getTimeString(myGroup.date);
				    return (
				    	<div key={myGroup.id}
		    		        style={{backgroundColor:"rgba(0, 0, 0, .3)", marginBottom:"30px"}}>
		    		        	<div className="mygroupdesc-title">Class</div>
		    		        	<div className="mygroupdesc-subtitle">{myGroup.subject}</div>

		    		        	<div className="mygroupdesc-title">Title</div>
		    		        	<div className="mygroupdesc-subtitle">{myGroup.title}</div>

		    		        	<div className="mygroupdesc-title">Time</div>
		    		        	<div className="mygroupdesc-subtitle">{time}</div>

		    		        	<div className="mygroupdesc-title">Date</div>
		    		        	<div className="mygroupdesc-subtitle">{date}</div>

		    		        	<div className="mygroupdesc-title">Location</div>
		    		        	<div className="mygroupdesc-subtitle">{myGroup.location}</div>
				    	</div>
				    );
				})
			  	}
			</div>
		);
	}
});

var MyGroups = React.createClass ({
	componentDidMount() {
		StudyGroupStore.fetchMyGroups();
		// setInterval(function() {StudyGroupStore.fetchMyGroups();} , refreshInterval);
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
							bodyStyle={{background:"linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('abstract.jpg') no-repeat",
										backgroundSize:'cover'}}
							autoDetectWindowHeight={true}
	  						autoScrollBodyContent={false}>
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