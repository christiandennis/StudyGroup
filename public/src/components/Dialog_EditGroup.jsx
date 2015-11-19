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
		var date = this.refs.editGroupDate.getDate();
		var location = this.refs.editGroupLocation;
		var capacity = 	this.refs.editGroupCapacity;

		var editGroupDialog = this.refs.editGroupDialog;
		var failedSnackbar = this.refs.editGroupFailedSnackbar;
		var successSnackbar = this.refs.editGroupSuccessSnackbar;
		StudyGroupStore.editGroup(id, title, subject, description, date, location, capacity, editGroupDialog, failedSnackbar, successSnackbar);
	},

	render() {
		var studyGroup = this.props.studyGroup;
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
			         	<TextField
			         		onEnterKeyDown = {this.submitEditGroupDetail}
			         		ref = "editGroupSubject"
			         	  	hintText="CS169"
			         	  	defaultValue={studyGroup.subject}
			         	  	floatingLabelText="Class" />
			         	<TextField
			         		onEnterKeyDown = {this.submitEditGroupDetail}
			         		ref = "editGroupTitle"
			         	  	hintText="Learn React together"
			         	  	defaultValue={studyGroup.title}
			         	  	floatingLabelText="Title" />
			         	<TextField
			         		onEnterKeyDown = {this.submitEditGroupDetail}
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
			         		ref = "editGroupLocation"
			         	  	hintText="Wozniak Longue, Soda Hall"
			         	  	defaultValue={studyGroup.location}
			         	  	floatingLabelText="Location"/>
			         	<TextField
			         		onEnterKeyDown = {this.submitEditGroupDetail}
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