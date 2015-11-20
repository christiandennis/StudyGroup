// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');

var StudyGroupStore = require('../stores/StudyGroupStore');

// Matertial UI components
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker/time-picker');
const Checkbox = require('material-ui/lib/checkbox');
const Snackbar = require('material-ui/lib/snackbar');
const moment = require('moment');


var NewGroupDialog = React.createClass({
	cancelNewGroup() {
		this.refs.newGroupDialog.dismiss();
	},

	submitNewGroup() {
		var title = this.refs.createGroupTitle;
		var subject = this.refs.createGroupSubject;
		var description =  this.refs.createGroupDescription;
		var date = this.refs.createGroupDate;
		var time = this.refs.createGroupTime;
		var location = this.refs.createGroupLocation;
		var capacity = 	this.refs.createGroupCapacity;
		var privacy = 0;

		// create the date
		new_time = time.getTime();
		new_date = date.getDate();
		date_str = new_date.toString();
		time_str = new_time.toString();
		time_str = time_str.slice(15);
		date_str = date_str.slice(0,15);
		date_str = date_str + time_str;
		date_epoch = moment(date_str).unix();

		if (this.refs.createGroupPrivacy.isChecked()){
			privacy = 1;
		}

		var newGroupDialog = this.refs.newGroupDialog;
		var failedSnackbar = this.refs.createGroupFailedSnackbar;
		var successSnackbar = this.refs.createGroupSuccessSnackbar;

		if (this.validateGroupSubject() && this.validateGroupTitle() && this.validateGroupDescription() && this.validateGroupLocation() && this.validateGroupCapacity() && validateGroupDateTime()) {
			StudyGroupStore.postNewGroup(title, subject, description, date_epoch, location, capacity, privacy, newGroupDialog, failedSnackbar, successSnackbar);
		}

		// if (title.getValue() && subject.getValue() && description.getValue() && location.getValue() && capacity.getValue() && date.getDate()) {
		// 	StudyGroupStore.postNewGroup(title, subject, description, moment(date_str).unix(), location, capacity, privacy, newGroupDialog, failedSnackbar, successSnackbar);
		// } else {
		// 	if (!title.getValue()){
		// 		title.setErrorText("This field is required");
		// 	}
		// 	if (!subject.getValue()){
		// 		subject.setErrorText("This field is required");
		// 	}
		// 	if (!description.getValue()){
		// 		description.setErrorText("This field is required");
		// 	}
		// 	if (!location.getValue()){
		// 		location.setErrorText("This field is required");
		// 	}
		// 	if (!capacity.getValue()){
		// 		capacity.setErrorText("This field is required");
		// 	}
		// 	if (!date.getDate()){
		// 		date.setErrorText("This field is required");
		// 	}
		// }
	},

	validateGroupDateTime() {
		new_time = this.refs.createGroupTime.getTime();
		new_date = this.refs.createGroupDate.getDate();
		date_str = new_date.toString().slice(0,15);
		time_str = new_time.toString().slice(15);
		date_epoch = moment(date_str + time_str).unix();
		if (date_epoch > getTime()){
			return false;
		} else {
			return true;
		}
	},

	validateGroupSubject() {
		var subject = this.refs.createGroupSubject;
		if (subject.getValue()) {
			if (subject.getValue().length <= 10){
				subject.setErrorText("");
				return true;
			} else {
				subject.setErrorText("Max 10 characters");
				return false;
			}
		} else {
			subject.setErrorText("This field is required");
			return false;
		}
	},

	validateGroupTitle() {
		var title = this.refs.createGroupTitle;
		if (title.getValue()) {
			if (title.getValue().length <= 30){
				title.setErrorText("");
				return true;	
			} else {
				title.setErrorText("Max 30 character");
				return false;
			}
		} else {
			subject.setErrorText("This field is required");
			return false;
		}
	},

	validateGroupDescription() {
		var description = this.refs.createGroupDescription;
		if (description.getValue()) {
			if(description.getValue().length <= 256){
				description.setErrorText("");
				return true;
			} else {
				description.setErrorText("Max 256 character");
				return false;
			}
		} else {
			description.setErrorText("This field is required");
			return false;
		}
	},

	validateGroupLocation() {
		var location = this.refs.createGroupLocation;
		if (location.getValue()) {
			if (location.getValue().length <= 30){
				location.setErrorText("");
				return true;
			} else {
				location.setErrorText("Max 30 characters");
				return false;
			}
		} else {
			location.setErrorText("This field is required");
			return false;
		}
	},

	validateGroupCapacity() {
		var capacity = this.refs.createGroupCapacity;
		if (capacity.getValue()) {
			if (/^\d+$/.test(capacity.getValue())) {
				if (parseInt(capacity.getValue()) > 0){
					capacity.setErrorText("");
					return true;
				} else {
					capacity.setErrorText("Must be greater than 0");
					return false;
				}
			} else {
				capacity.setErrorText("Capacity must be a number");
				return false;
			}
		} else {
			capacity.setErrorText("This field is required");
			return false;
		}
	},

	openTimePicker() {
			this.refs.createGroupTime.openDialog();
	},

	render() {
		return (
			<div>
				<Dialog ref="newGroupDialog" 
						title="Create a New StudyGroup" 
						modal={true}
						actions={[
							  <FlatButton
							    label="Cancel"
							    secondary={true}
							    onTouchTap={this.cancelNewGroup} />,
							  <FlatButton
							    label="Submit"
							    primary={true}
							    onTouchTap={this.submitNewGroup} />]}
				  		autoDetectWindowHeight={true} 
				  		autoScrollBodyContent={true}>
				    <div>
				    	<TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		ref = "createGroupSubject"
				    		onChange={this.validateGroupSubject}
					    	hintText="CS169"
					    	floatingLabelText="Class" />
				    	<TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		ref = "createGroupTitle"
				    		onChange={this.validateGroupTitle}
				    	  	hintText="Learn React together"
				    	  	floatingLabelText="Title" />
				    	<TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		onChange={this.validateGroupDescription}
				    		ref = "createGroupDescription"
				    	  	hintText="Come and learn the basic (and some advanced) React together! REACT IS THE FUTURE!!!"
				    	  	floatingLabelText="Description"
				    	  	fullWidth={true}
				    	  	multiLine={true}/>
				    	<DatePicker
				    		ref = "createGroupDate"
				    	  	hintText="Nov 22, 2015"
				    	  	onDismiss={this.openTimePicker}
				    	  	floatingLabelText="Date"/>
				    	<TimePicker
				    		ref = "createGroupTime"
				    	  	hintText="9:00 pm"
				    	  	floatingLabelText="Time"/>
				    	<TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		onChange={this.validateGroupLocation}
				    		ref = "createGroupLocation"
				    	  	hintText="Wozniak Longue, Soda Hall"
				    	  	floatingLabelText="Location"/>
				    	<TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		onChange={this.validateGroupCapacity}
				    		ref = "createGroupCapacity"
				    	  	hintText="20"
				    	  	floatingLabelText="Capacity"/>
				    	<Checkbox
				    		ref = "createGroupPrivacy"
				    	  	name="privacy"
				    	  	value="private"
				    	  	label="private"/>
				    </div>
				</Dialog>

				<Snackbar
	           		ref = "createGroupFailedSnackbar"
	             	message="Failed to create group"
	             	autoHideDuration="5000"/>

	    		<Snackbar
	           		ref = "createGroupSuccessSnackbar"
	             	message="Group Created"
	             	autoHideDuration="5000"/>
            </div>
		)
	}
})

module.exports = NewGroupDialog;