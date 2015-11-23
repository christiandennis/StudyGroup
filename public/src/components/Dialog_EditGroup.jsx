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
		date_str = date.toString().slice(0,15);
		time_str = time.toString().slice(15);
		return moment(date_str + time_str).unix();
	},

	calculateTime(time, date) {
		date_str = date.toString().slice(0,15);
		time_str = time.toString().slice(15);
		return date_str + time_str
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

		if (this.validateGroupSubject() & this.validateGroupTitle() & this.validateGroupDescription() & this.validateGroupLocation() & this.validateGroupCapacity() & this.validateGroupDateTime()) {
			StudyGroupStore.editGroup(id, title, subject, description, this.calculateTime(time.getTime(), date.getDate()), location, capacity, editGroupDialog, failedSnackbar, successSnackbar);
		}
	},

	validateGroupDateTime() {
		var time = this.refs.editGroupTime;
		var date = this.refs.editGroupDate;
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
				if (parseInt(capacity.getValue()) < this.props.studyGroup.guestlist){
					capacity.setErrorText("Capacity must be bigger than guest numer: "+ this.props.studyGroup.guestlist);
					return false;
				} else if (parseInt(capacity.getValue()) > 0){
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

	getDateEpoch(date){
		var d = new Date(0);
		d.setUTCSeconds(date);
		return d;
	},

	render() {
		var studyGroup = this.props.studyGroup;
		// var date = this.getDateEpoch(studyGroup.date);
		var date = new Date(studyGroup.date);
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
	         	    	<div style={{width:'35%', float:'left'}}><TextField
	         	    		onEnterKeyDown = {this.submitNewGroup}
	         	    		ref = "editGroupSubject"
	         	    		onChange={this.validateGroupSubject}
	         		    	hintText="CS169"
	         		    	fullWidth={true}
	         		    	defaultValue={studyGroup.subject}
	         		    	floatingLabelText="Class" /></div>
	         	    	<div style={{width:'65%', float:'left'}}><TextField
	         	    		onEnterKeyDown = {this.submitNewGroup}
	         	    		ref = "editGroupTitle"
	         	    		onChange={this.validateGroupTitle}
	         	    	  	hintText="Learn React together"
	         	    	  	fullWidth={true}
	         	    	  	defaultValue={studyGroup.title}
	         	    	  	floatingLabelText="Title" /></div>
	         	    	<TextField
	         	    		onEnterKeyDown = {this.submitNewGroup}
	         	    		onChange={this.validateGroupDescription}
	         	    		ref = "editGroupDescription"
	         	    	  	hintText="Come and learn the basic (and some advanced) React together! REACT IS THE FUTURE!!!"
	         	    	  	floatingLabelText="Description"
	         	    	  	fullWidth={true}
	         	    	  	defaultValue={studyGroup.description}
	         	    	  	multiLine={true}/>
	         	    	<div style={{width:'35%', float:'left'}}><TimePicker
	         	    		ref = "editGroupTime"
	         	    	  	hintText="9:00 pm"
	         	    	  	fullWidth={true}
	         	    	  	autoOk={true}
	         	    	  	defaultTime={date}
	         	    	  	floatingLabelText="Time"/></div>
	         	    	<div style={{width:'65%', float:'left'}}><DatePicker
	         	    		ref = "editGroupDate"
	         	    	  	hintText="Nov 22, 2015"
	         	    	  	fullWidth={true}
	         	    	  	defaultDate={date}
	         	    	  	floatingLabelText="Date"/></div>
	         	    	<div style={{width:'80%', float:'left'}}><TextField
	         	    		onEnterKeyDown = {this.submitNewGroup}
	         	    		onChange={this.validateGroupLocation}
	         	    		ref = "editGroupLocation"
	         	    	  	hintText="Wozniak Longue, Soda Hall"
	         	    	  	fullWidth={true}
	         	    	  	defaultValue={studyGroup.location}
	         	    	  	floatingLabelText="Location"/></div>
	         	    	<div style={{width:'20%', float:'left'}}><TextField
	         	    		onEnterKeyDown = {this.submitNewGroup}
	         	    		onChange={this.validateGroupCapacity}
	         	    		ref = "editGroupCapacity"
	         	    	  	hintText="20"
	         	    	  	fullWidth={true}
	         	    	  	defaultValue={studyGroup.capacity}
	         	    	  	floatingLabelText="Capacity"/></div>
		        	</div>
		        </Dialog>

    			<Snackbar
               		ref = "editGroupFailedSnackbar"
                 	message="Failed to edit group"
                 	autoHideDuration={5000}/>

        		<Snackbar
               		ref = "editGroupSuccessSnackbar"
                 	message="Group Edited"
                 	autoHideDuration={5000}/>
			</div>
		)
	}
})

module.exports = LoginDialog;