// var button = require('react-materialize').Button;
var React = require('react');
var Link = require('react-router').Link;
var render = require('react-dom').render;

var AltContainer = require('alt/AltContainer');
var StudyGroupStore = require('../stores/StudyGroupStore');
var StudyGroupActions = require('../actions/StudyGroupActions');
var ReactTestUtils = require('react-addons-test-utils');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

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

var tmpStudyGroup = null;


var AllStudyGroups = React.createClass({
	// this method should fetch the group detail and comments
	// parameter : groupId
	viewGroupDetail(param) {
		console.log("open group detail");
		tmpStudyGroup = param;
		this.refs.groupDetailDialog.show();
	},

	viewGroupDetailOnShow() {
		this.refs.groupdetailClass.innerHTML = tmpStudyGroup.subject;
		this.refs.groupdetailTitle.innerHTML = tmpStudyGroup.title;
		this.refs.groupdetailHost.innerHTML = "@" + tmpStudyGroup.host;
		var date = moment(tmpStudyGroup.datetime).format("ddd, MMM D").toString();
		var time = moment(tmpStudyGroup.datetime).format("h:mm a").toString();
		this.refs.groupdetailTime.innerHTML = time;
		this.refs.groupdetailDate.innerHTML = date;
		this.refs.groupdetailLocation.innerHTML = tmpStudyGroup.location;
		this.refs.groupdetailDescription.innerHTML = tmpStudyGroup.description;
	},

	editGroupDetail(){
		this.refs.groupDetailDialog.dismiss();
		this.refs.editGroupDialog.show();
	},

	editGroupDetailOnShow(){
		this.refs.editGroupTitle.setValue(tmpStudyGroup.title);
		this.refs.editGroupSubject.setValue(tmpStudyGroup.subject);
		this.refs.editGroupLocation.setValue(tmpStudyGroup.location);
		this.refs.editGroupDescription.setValue(tmpStudyGroup.description);
		this.refs.editGroupCapacity.setValue(tmpStudyGroup.capacity);
		var datetime = moment(tmpStudyGroup.datetime).toDate();
		this.refs.editGroupTime.setTime(datetime);
		this.refs.editGroupDate.setDate(datetime);

	},

	cancelEditGroupDetail() {
		console.log("closing editgroup dialog");
		this.refs.editGroupDialog.dismiss();
	},

	submitEditGroupDetail() {
		var title = this.refs.editGroupTitle.getValue();
		var subject = this.refs.editGroupSubject.getValue();
		var description =  this.refs.editGroupDescription.getValue();
		var date = this.refs.editGroupDate.getDate();
		var location = this.refs.editGroupLocation.getValue();
		var capacity = 	this.refs.editGroupCapacity.getValue();
		var host = this.props.user;

		if (false) {
			console.log(title);
			console.log(subject);
			console.log(description);
			console.log(date);
			console.log(location);
			console.log(capacity);
			console.log(host);
		}

		var newGroupDialog = this.refs.newGroupDialog;
		var failedSnackbar = this.refs.createGroupFailedSnackbar;
		var successSnackbar = this.refs.createGroupSuccessSnackbar;
		StudyGroupStore.postNewGroup();
	},

	joinGroup() {
		console.log("Join group here");
	},

	calculateTimeColor(card_date) {
		console.log("calculate the color for given time");
		var card_epoch = moment(card_date).unix();
		console.log("THIS IS THE EPOCH TIME");
		console.log(card_date);
		console.log(card_epoch);

		var curr_time = new Date();
		curr_time = curr_time.toString();
		var curr_epoch = moment(curr_time).unix();
		console.log("THIS IS EPOCH FOR CURRENT TIME");
		console.log(curr_time);
		console.log(curr_epoch);

		var time_diff = card_epoch - curr_epoch;
		console.log("TIME IDFF");
		console.log(time_diff);

		if (time_diff >= 259200) {
			console.log("returned color")
			console.log(1)
			return 1;
		}

		else if (time_diff >= 86400) {
			console.log("returned color")
			console.log(2)
			return 2;
		}

		else {
			console.log("returned color")
			console.log(3)
			return 3;
		}
	},

	render() {
		if (this.props.errorMessage) {
			return (
				<div>{this.props.errorMessage}</div>
			);
		}
		if (StudyGroupStore.isLoading()) {
			var left = window.document.documentElement.clientWidth/2 - 25;
			var top = window.document.documentElement.clientHeight/2 - 25;
			return(
				<div>
					<RefreshIndicator size={50} left={left} top={top} status="loading" /> 
				</div>
			);
		}

		if (this.props.studyGroups){
			return (
				<div>
					<Dialog ref="groupDetailDialog"
							title="StudyGroup Detail" 
							actions={[]}
							onShow={this.viewGroupDetailOnShow}
					  		autoDetectWindowHeight={true} 
					  		autoScrollBodyContent={true}>
					    <div>
					    	<div className="groupdesc-title">Class</div>
					    	<div ref="groupdetailClass" className="groupdesc-subtitle"></div>

					    	<div className="groupdesc-title">Title</div>
					    	<div ref="groupdetailTitle" className="groupdesc-subtitle"></div>

					    	<div className="groupdesc-title">Host</div>
					    	<div ref="groupdetailHost" className="groupdesc-subtitle"></div>

					    	<div className="groupdesc-title">Time</div>
					    	<div ref="groupdetailTime" className="groupdesc-subtitle"></div>

					    	<div className="groupdesc-title">Date</div>
					    	<div ref="groupdetailDate" className="groupdesc-subtitle"></div>

					    	<div className="groupdesc-title">Location</div>
					    	<div ref="groupdetailLocation" className="groupdesc-subtitle"></div>

					    	<div className="groupdesc-title">Description</div>
					    	<div ref="groupdetailDescription" className="groupdesc-subtitle"></div>

					    	<FlatButton label="Edit" onClick={this.editGroupDetail}/>

					    </div>
					</Dialog>

			        <Dialog ref="editGroupDialog"
			        	title="Edit StudyGroup" 
			        	onShow={this.editGroupDetailOnShow}
			        	modal={true}
			        	actions={[
			        		  <FlatButton
			        		    label="Cancel"
			        		    secondary={true}
			        		    onTouchTap={this.cancelEditGroupDetail} />,
			        		  <FlatButton
			        		    label="Submit"
			        		    primary={true}
			        		    onTouchTap={this.submitEditGroupDetail} />]}
			        		autoDetectWindowHeight={true} 
			        		autoScrollBodyContent={true}>
			          	<div>
				         	<TextField
				         		onEnterKeyDown = {this.submitEditGroupDetail}
				         		ref = "editGroupSubject"
				         	  	hintText="CS169"
				         	  	floatingLabelText="Class" />
				         	<TextField
				         		onEnterKeyDown = {this.submitEditGroupDetail}
				         		ref = "editGroupTitle"
				         	  	hintText="Learn React together"
				         	  	floatingLabelText="Title" />
				         	<TextField
				         		onEnterKeyDown = {this.submitEditGroupDetail}
				         		ref = "editGroupDescription"
				         	  	hintText="Come and learn the basic (and some advanced) React together! REACT IS THE FUTURE!!!"
				         	  	floatingLabelText="Description"
				         	  	fullWidth={true}
				         	  	multiLine={true}/>
				         	<DatePicker
				         		ref = "editGroupDate"
				         	  	hintText="Nov 22, 2015"
				         	  	floatingLabelText="Date"/>
				         	<TimePicker
				         		ref = "editGroupTime"
				         	  	hintText="9:00 pm"
				         	  	floatingLabelText="Time"/>
				         	<TextField
				         		onEnterKeyDown = {this.submitEditGroupDetail}
				         		ref = "editGroupLocation"
				         	  	hintText="Wozniak Longue, Soda Hall"
				         	  	floatingLabelText="Location"/>
				         	<TextField
				         		onEnterKeyDown = {this.submitEditGroupDetail}
				         		ref = "editGroupCapacity"
				         	  	hintText="20"
				         	  	floatingLabelText="Capacity"/>
			        	</div>
			        </Dialog>

					<ul>
					  {this.props.studyGroups.map((studyGroup, i) => {
					  	var date = moment(studyGroup.date).format("ddd, MMM D").toString();
					  	var time = moment(studyGroup.date).format("h:mm a").toString();
					  	var studygroupID = studyGroup.id;

					  	// call the function to calculate color
					  	var color_chosen_int = this.calculateTimeColor(studyGroup.date);
					  	var color_chosen = "colorBar";

					  	if (color_chosen_int == 1) {
					  		color_chosen = "colorBarGreen";
					  	}

					  	else if (color_chosen_int == 2) {
					  		color_chosen = "colorBarYellow";
					  	}

					  	else {
					  		color_chosen = "colorBarRed";
					  	}

					  	console.log("color chosen:")
					  	console.log(color_chosen)
					    return (
					    	<div key={studyGroup.id}>
			    		        <Paper zDepth={3} className="card-container">
			    			        <div className="card studyGroup">
			    			            <div className={color_chosen}></div>
			    			            <table>
			    			                <tr className="row1">
			    			                    <td className="userPhotoHolder">
			    			                        <div className="photoHolder">
			    			                            <div className="circle">
			    			                                <img className="userPhoto" src="http://nick.mtvnimages.com/nick/properties/spongebob-squarepants/characters/spongebob-about-web-desktop.jpg?quality=0.75" />
			    			                            </div>
			    			                        </div>

			    			                    </td>
			    			                    <td colSpan="2">
			    			                        <span className="subject">{studyGroup.subject}</span>
			    			                        <span className="title">{studyGroup.title}</span>
			    			                    </td>

			    			                    <td colSpan="2" align="right" className="dateTimeHolder">
			    			                        <div className="date">{date}</div>
			    			                        <div className="time">{time}</div>
			    			                    </td>
			    			                </tr>

			    			                <tr className="row2">
			    			                    <td className="exclamationHolder">
			    			                        <div className="exclamation"></div>
			    			                    </td>
			    			                    <td colSpan="3">
			    			                        <div className="description">{studyGroup.description}</div>
			    			                        <div className="seeMore" onClick={this.viewGroupDetail.bind(this, studyGroup)}>See more...</div>
			    			                    </td>
			    			                </tr>

			    			                <tr className="row3">
			    			                    <td className="pinHolder">
			    			                        <div className="pin"></div>
			    			                    </td>
			    			                    <td colSpan="2">
			    			                        <div className="location">{studyGroup.location}</div>
			    			                    </td>
			    			                </tr>

			    			                <tr className="row4">
			    			                    <td></td>
			    			                    <td colSpan="1"><span className="host">@{studyGroup.host}</span>
			    			                    </td>
			    			                    <td colSpan="2">
			    			                        <div style={{textAlign:"right"}} className="joinButtonContainer">
			    			                            <RaisedButton onClick={this.joinGroup.bind(this, studyGroup)} label="Join"/>
			    			                        </div>
			    			                    </td>
			    			                    <td>
			    			                        <div className="capacityHolder">
			    			                            <div className="capacity">{studyGroup.guestlist}/{studyGroup.capacity}</div>
			    			                        </div>
			    			                    </td>
			    			                </tr>
			    			            </table>
			    			        </div>
			    		        </Paper>
					    	</div>
					    );
					  })}
					</ul>

					
				</div>
			);
		}
	}
});

// TESTING

var StudyGroups = React.createClass ({
	componentDidMount() {
		var state = StudyGroupStore.getState();
		StudyGroupStore.fetchStudyGroups();	
		
	},

	componentWillUpdate() {
		var state = StudyGroupStore.getState();
	},

	render(){
		if (this.props.studyGroups!=null) {
			return (
				<div>
					<AltContainer store = {StudyGroupStore}>
						<AllStudyGroups/>
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

module.exports = StudyGroups;