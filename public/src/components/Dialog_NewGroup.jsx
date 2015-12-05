// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');

var StudyGroupStore = require('../stores/StudyGroupStore');
var StudyGroupActions = require('../actions/StudyGroupActions');

// Matertial UI components
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker/time-picker');
const Snackbar = require('material-ui/lib/snackbar');
const moment = require('moment');
const helper = require('../helper/Helper_Form');


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

		var newGroupDialog = this.refs.newGroupDialog;
		var failedSnackbar = this.refs.createGroupFailedSnackbar;
		var successSnackbar = this.refs.createGroupSuccessSnackbar;

		var isGroupDateTimeValid = helper.validateGroupDateTime(this.refs.createGroupTime.getTime(), this.refs.createGroupDate.getDate());

		if(!isGroupDateTimeValid) {
			this.refs.dateSnackbar.show();
		} else if (this.validateGroupSubject() & this.validateGroupTitle() & this.validateGroupDescription() & this.validateGroupLocation() & this.validateGroupCapacity() & isGroupDateTimeValid) {
			StudyGroupStore.postNewGroup(title, subject, description, helper.calculateTime(time.getTime(), date.getDate()), location, capacity, privacy, newGroupDialog, failedSnackbar, successSnackbar);
		}
	},


	validateGroupSubject() {
		var subject = this.refs.createGroupSubject;
		var subjectString = subject.getValue();

		switch (helper.isValidSubject(subjectString)) {
			case 'valid':
				subject.setErrorText('');
				return true;
				break;
			case 'toomuch':
				subject.setErrorText("Max 10 characters");
				return false;
				break;
			case 'empty':
				subject.setErrorText("This field is required");
				return false;
				break;
		}
	},

	validateGroupTitle() {
		var title = this.refs.createGroupTitle;
		var titleString = title.getValue();
		switch (helper.isValidTitle(titleString)) {
			case 'valid':
				title.setErrorText('');
				return true;
				break;
			case 'toomuch':
				title.setErrorText("Max 30 characters");
				return false;
				break;
			case 'empty':
				title.setErrorText("This field is required");
				return false;
				break;
		};
	},

	validateGroupDescription() {
		var description = this.refs.createGroupDescription;
		var descriptionString = description.getValue();
		switch (helper.isValidDescription(descriptionString)) {
			case 'valid':
				description.setErrorText("");
				return true;
				break;
			case 'toomuch':
				description.setErrorText("Max 256 character");
				return false;
				break
			case 'empty':
				description.setErrorText("This field is required");
				return false;
				break;
		};
	},

	validateGroupLocation() {
		var location = this.refs.createGroupLocation;
		var locationString = location.getValue();
		switch (helper.isValidLocation(locationString)) {
			case 'valid':
				location.setErrorText('');
				return true;
				break;
			case 'toomuch':
				location.setErrorText("Max 30 characters");
				return false;
				break;
			case 'empty':
				location.setErrorText("This field is required");
				return false;
				break;
		}
	},

	validateGroupCapacity() {
		var capacity = this.refs.createGroupCapacity;
		var capacityString = capacity.getValue();
		switch (helper.isValidCapacity(capacityString,-Infinity)) {
			case 'smallerThanGuest':
				capacity.setErrorText("Capacity must be bigger than guest number: "+ this.props.studyGroup.guestlist);
				return false;
				break;
			case 'valid':
				capacity.setErrorText('');
				return true;
				break;
			case 'lessThanZero':
				capacity.setErrorText("Must be greater than 0");
				return false;
				break;
			case 'notNumber':
				capacity.setErrorText("Capacity must be a number");
				return false;
				break;
			case 'empty':
				capacity.setErrorText("This field is required");
				return false;
				break;

		}
	},

	render() {
		return (
			<div>
				<Dialog ref="newGroupDialog" 
						title="Create a New StudyGroup" 
						contentStyle={{
									    top: '-65px'
									  }}
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
				  		autoScrollBodyContent={false}>
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
				    	  	floatingLabelText="Time"
				    	  	onShow={StudyGroupActions.pauseShortPolling}
				    	  	onDismiss={StudyGroupActions.continueShortPolling}/></div>
				    	<div style={{width:'65%', float:'left'}}><DatePicker
				    		ref = "createGroupDate"
				    	  	hintText="Nov 22, 2015"
				    	  	fullWidth={true}
				    	  	floatingLabelText="Date"
				    	  	onShow={StudyGroupActions.pauseShortPolling}
				    	  	onDismiss={StudyGroupActions.continueShortPolling}/></div>
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

	             <Snackbar
	           		ref = "dateSnackbar"
	             	message="Please enter a date/time in the future"
	             	autoHideDuration="5000"/>
            </div>
		)
	}
})

module.exports = NewGroupDialog;