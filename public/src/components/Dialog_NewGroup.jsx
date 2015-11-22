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
const Snackbar = require('material-ui/lib/snackbar');
const moment = require('moment');


var NewGroupDialog = React.createClass({
	cancelNewGroup() {
		this.refs.newGroupDialog.dismiss();
	},

	calculateTimeEpoch(time, date) {
		date_str = date.toString().slice(0,15);
		time_str = time.toString().slice(15);
		return moment(date_str + time_str).unix();
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

		var newGroupDialog = this.refs.newGroupDialog;
		var failedSnackbar = this.refs.createGroupFailedSnackbar;
		var successSnackbar = this.refs.createGroupSuccessSnackbar;

		if (this.validateGroupSubject() & this.validateGroupTitle() & this.validateGroupDescription() & this.validateGroupLocation() & this.validateGroupCapacity() & this.validateGroupDateTime()) {
			StudyGroupStore.postNewGroup(title, subject, description, this.calculateTimeEpoch(time.getTime(), date.getDate()), location, capacity, privacy, newGroupDialog, failedSnackbar, successSnackbar);
		}
	},

	validateGroupDateTime() {
		var time = this.refs.createGroupTime;
		var date = this.refs.createGroupDate;
		if (time.getTime() && date.getDate()) {
			var time_epoch = this.calculateTimeEpoch(time.getTime(), date.getDate());
			var time_now = new Date().getTime() / 1000;
			if (time_epoch > time_now){
				return true;
			} else {
				return false;
			}
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
			title.setErrorText("This field is required");
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
				    	<div style={{width:'35%', float:'left'}}><TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		ref = "createGroupSubject"
				    		onChange={this.validateGroupSubject}
					    	hintText="CS169"
					    	fullWidth={true}
					    	floatingLabelText="Class" /></div>
				    	<div style={{width:'65%', float:'left'}}><TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		ref = "createGroupTitle"
				    		onChange={this.validateGroupTitle}
				    	  	hintText="Learn React together"
				    	  	fullWidth={true}
				    	  	floatingLabelText="Title" /></div>
				    	<TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		onChange={this.validateGroupDescription}
				    		ref = "createGroupDescription"
				    	  	hintText="Come and learn the basic (and some advanced) React together! REACT IS THE FUTURE!!!"
				    	  	floatingLabelText="Description"
				    	  	fullWidth={true}
				    	  	multiLine={true}/>
				    	<div style={{width:'35%', float:'left'}}><TimePicker
				    		ref = "createGroupTime"
				    	  	hintText="9:00 pm"
				    	  	fullWidth={true}
				    	  	autoOk={true}
				    	  	floatingLabelText="Time"/></div>
				    	<div style={{width:'65%', float:'left'}}><DatePicker
				    		ref = "createGroupDate"
				    	  	hintText="Nov 22, 2015"
				    	  	fullWidth={true}
				    	  	floatingLabelText="Date"/></div>
				    	<div style={{width:'80%', float:'left'}}><TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		onChange={this.validateGroupLocation}
				    		ref = "createGroupLocation"
				    	  	hintText="Wozniak Longue, Soda Hall"
				    	  	fullWidth={true}
				    	  	floatingLabelText="Location"/></div>
				    	<div style={{width:'20%', float:'left'}}><TextField
				    		onEnterKeyDown = {this.submitNewGroup}
				    		onChange={this.validateGroupCapacity}
				    		ref = "createGroupCapacity"
				    	  	hintText="20"
				    	  	fullWidth={true}
				    	  	floatingLabelText="Capacity"/></div>
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