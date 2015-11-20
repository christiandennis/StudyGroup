// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');
var History = Router.History;
var StudyGroupStore = require('../stores/StudyGroupStore');

// Matertial UI components
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker/time-picker');
const Snackbar = require('material-ui/lib/snackbar');

const moment = require('moment');

var LoginDialog = React.createClass({
	mixins: [History],

	cancelEditGroupDetail() {
		this.refs.editGroupDialog.dismiss();
	},

	submitEditGroupDetail() {
		var id = this.props.studyGroup.id;
		var title = this.refs.editGroupTitle;
		var subject = this.refs.editGroupSubject;
		var description =  this.refs.editGroupDescription;
		var date = this.refs.editGroupDate;
		var time = this.refs.editGroupTime;
		var location = this.refs.editGroupLocation;
		var capacity = 	this.refs.editGroupCapacity;

		var new_time = time.getTime();
		var new_date = date.getDate();
		var date_str = new_date.toString();
		var time_str = new_time.toString();
		var time_str = time_str.slice(15);
		var date_str = date_str.slice(0,15);
		var date_str = date_str + time_str;

		var editGroupDialog = this.refs.editGroupDialog;
		var failedSnackbar = this.refs.editGroupFailedSnackbar;
		var successSnackbar = this.refs.editGroupSuccessSnackbar;

		if (title.getValue() && subject.getValue() && description.getValue() && location.getValue() && capacity.getValue() && date.getDate() && time.getTime()) {
			StudyGroupStore.editGroup(id, title, subject, description, moment(date_str).unix(), location, capacity, editGroupDialog, failedSnackbar, successSnackbar);
		} else {
			if (!title.getValue()){
				title.setErrorText("This field is required");
			}
			if (!subject.getValue()){
				subject.setErrorText("This field is required");
			}
			if (!description.getValue()){
				description.setErrorText("This field is required");
			}
			if (!location.getValue()){
				location.setErrorText("This field is required");
			}
			if (!capacity.getValue()){
				capacity.setErrorText("This field is required");
			}
		}
	},

	validateGroupSubject() {
		var subject = this.refs.editGroupSubject;
		if (subject.getValue()) {
			subject.setErrorText("");
			return true;
		} else {
			subject.setErrorText("This field is required");
			return false;
		}
	},

	validateGroupTitle() {
		var subject = this.refs.editGroupTitle;
		if (subject.getValue()) {
			subject.setErrorText("");
			return true;
		} else {
			subject.setErrorText("This field is required");
			return false;
		}
	},

	validateGroupDescription() {
		var subject = this.refs.editGroupDescription;
		if (subject.getValue()) {
			subject.setErrorText("");
			return true;
		} else {
			subject.setErrorText("This field is required");
			return false;
		}
	},

	validateGroupLocation() {
		var subject = this.refs.editGroupLocation;
		if (subject.getValue()) {
			subject.setErrorText("");
			return true;
		} else {
			subject.setErrorText("This field is required");
			return false;
		}
	},

	validateGroupCapacity() {
		var subject = this.refs.editGroupCapacity;
		if (subject.getValue()) {
			subject.setErrorText("");
			return true;
		} else {
			subject.setErrorText("This field is required");
			return false;
		}
	},

	render() {
		var studyGroup = this.props.studyGroup;
		var date = new Date(0);
		date.setUTCSeconds(studyGroup.date);
		return (
			<div>
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
			         		onChange={this.validateGroupSubject}
			         		ref = "editGroupSubject"
			         	  	hintText="CS169"
			         	  	defaultValue={studyGroup.subject}
			         	  	floatingLabelText="Class" />
			         	<TextField
			         		onEnterKeyDown = {this.submitEditGroupDetail}
				    		onChange={this.validateGroupTitle}
			         		ref = "editGroupTitle"
			         	  	hintText="Learn React together"
			         	  	defaultValue={studyGroup.title}
			         	  	floatingLabelText="Title" />
			         	<TextField
			         		onEnterKeyDown = {this.submitEditGroupDetail}
				    		onChange={this.validateGroupDescription}
			         		ref = "editGroupDescription"
			         	  	hintText="Come and learn the basic (and some advanced) React together! REACT IS THE FUTURE!!!"
			         	  	floatingLabelText="Description"
			         	  	defaultValue={studyGroup.description}
			         	  	fullWidth={true}
			         	  	multiLine={true}/>
			         	<DatePicker
			         		ref = "editGroupDate"
			         	  	hintText="Nov 22, 2015"
			         	  	defaultDate={date}
			         	  	floatingLabelText="Date"/>
			         	<TimePicker
			         		ref = "editGroupTime"
			         	  	hintText="9:00 pm"
			         	  	defaultTime={date}
			         	  	floatingLabelText="Time"/>
			         	<TextField
			         		onEnterKeyDown = {this.submitEditGroupDetail}
				    		onChange={this.validateGroupLocation}
			         		ref = "editGroupLocation"
			         	  	hintText="Wozniak Longue, Soda Hall"
			         	  	defaultValue={studyGroup.location}
			         	  	floatingLabelText="Location"/>
			         	<TextField
			         		onEnterKeyDown = {this.submitEditGroupDetail}
				    		onChange={this.validateGroupCapacity}
			         		ref = "editGroupCapacity"
			         	  	hintText="20"
			         	  	defaultValue={studyGroup.capacity}
			         	  	floatingLabelText="Capacity"/>
		        	</div>
		        </Dialog>

    			<Snackbar
               		ref = "editGroupFailedSnackbar"
                 	message="Failed to edit group"
                 	autoHideDuration="5000"/>

        		<Snackbar
               		ref = "editGroupSuccessSnackbar"
                 	message="Group Edited"
                 	autoHideDuration="5000"/>
			</div>
		)
	}
})

module.exports = LoginDialog;