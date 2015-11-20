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

var LoginDialog = React.createClass({
	cancelEditGroupDetail() {
		this.refs.editGroupDialog.dismiss();
	},

	calculateTimeEpoch(time, date) {
		new_time = time.getTime();
		new_date = date.getDate();
		date_str = new_date.toString();
		time_str = new_time.toString();
		time_str = time_str.slice(15);
		date_str = date_str.slice(0,15);
		date_str = date_str + time_str;
		return moment(date_str).unix();
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

		var editGroupDialog = this.refs.editGroupDialog;
		var failedSnackbar = this.refs.editGroupFailedSnackbar;
		var successSnackbar = this.refs.editGroupSuccessSnackbar;

		if (this.validateGroupSubject() && this.validateGroupTitle() && this.validateGroupDescription() && this.validateGroupLocation() && this.validateGroupCapacity() && this.validateGroupDateTime()) {
			StudyGroupStore.editGroup(id, title, subject, description, this.calculateTimeEpoch(time, date), location, capacity, editGroupDialog, failedSnackbar, successSnackbar);
		}
	},

	validateGroupDateTime() {
		var new_time = this.refs.editGroupTime.getTime();
		var new_date = this.refs.editGroupDate.getDate();
		var date_str = new_date.toString().slice(0,15);
		var time_str = new_time.toString().slice(15);
		var date_epoch = moment(date_str + time_str).unix();
		var time_now = new Date().getTime() / 1000;
		if (date_epoch > time_now){
			return true;
		} else {
			return false;
		}
	},

	validateGroupSubject() {
		var subject = this.refs.editGroupSubject;
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
		var title = this.refs.editGroupTitle;
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
		var description = this.refs.editGroupDescription;
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
		var location = this.refs.editGroupLocation;
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
		var capacity = this.refs.editGroupCapacity;
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