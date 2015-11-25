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
const Snackbar = require('material-ui/lib/snackbar');

const helper = require('../helper/Helper_Dialog_SignUp');

var SignUpDialog = React.createClass({
	mixins: [History],

	cancelSignUp() {
		this.refs.signUpDialog.dismiss();
	},

	submitSignUp() {
		var fullname = this.refs.fullNameSignUp;
		var fullnameSignUp = this.refs.fullNameSignUp;
		var email = this.refs.emailSignUp;
		var password = this.refs.passwordSignUp;
		var confirmPassword = this.refs.confirmPasswordSignUp;
		var signUpDialog = this.refs.signUpDialog;
		var schoolSignUp =  this.refs.schoolSignUp;
		var usernameSignUp =  this.refs.usernameSignUp;

		if (this.validateUsername() & this.validateSchool() & this.validateEmail() & this.validateFullName() & this.validatePasswordMatch()) {
			StudyGroupStore.signUp(this.history, fullname, fullnameSignUp, email, password, confirmPassword, schoolSignUp, usernameSignUp, signUpDialog, this.refs.unavailableEmailSnackbar, this.refs.unavailableUsernameSnackbar, this.refs.passwordNotMatchSnackbar, this.refs.failedSnackbar);
		}
	},

	validateFullName() {
		var fullname = this.refs.fullNameSignUp;

		switch (helper.validateFullName(fullname.getValue())) {
			case true:
				fullname.setErrorText('');
				return true;
				break;
			case false:
				fullname.setErrorText("This field is required");
				return false;
				break;
		}
	},

	validateUsername() {
		var username = this.refs.usernameSignUp;
		switch (helper.validateUsername(username.getValue())) {
			case true:
				username.setErrorText('');
				return true;
				break;
			case false:
				username.setErrorText("This field is required");
				return false;
				break;
		}
	},

	validateSchool() {
		var school = this.refs.schoolSignUp;
		switch (helper.validateSchool(school.getValue())) {
			case true:
				school.setErrorText('');
				return true;
				break;
			case false:
				school.setErrorText("This field is required");
				return false;
				break;
		}
	},

	validateEmail() {
		var email = this.refs.emailSignUp;
		switch (helper.validateEmail(email.getValue())) {
			case 'valid':
				email.setErrorText('');
				return true;
				break;
			case 'empty':
				email.setErrorText("This field is required");
				return false;
				break;
			case 'invalid':
				email.setErrorText("Invalid email");
				return false;
				break;
		}
	},

	validatePasswordMatch() {
		var password = this.refs.passwordSignUp;
		var confirmPassword = this.refs.confirmPasswordSignUp;
		var filled = true;
		
		if (!password.getValue()){
			password.setErrorText('This field is required');
			filled = false;
		}
		if (!confirmPassword.getValue()){
			confirmPassword.setErrorText('This field is required');
			filled = false;
		}


		if (filled && password.getValue()===confirmPassword.getValue()) {
			password.setErrorText("");
			confirmPassword.setErrorText("");
			if(password.getValue().length < 8){
				password.setErrorText("Password must be at least 8 characters");
				confirmPassword.setErrorText("Password must be at least 8 characters");
				return false;
			}
			return true;
		} else if (filled) {
			if(password.getValue().length < 8){
				password.setErrorText("Password must be at least 8 characters");
				confirmPassword.setErrorText("Password must be at least 8 characters");
				return false;
			} else {
				password.setErrorText("Password must match");
				confirmPassword.setErrorText("Password must match");
				return false;
			}
		} else {
			return false;
		}
	},

	render() {
		return (
			<div>
				<Dialog ref="signUpDialog" 
						title="Sign Up" 
						actions={[
							  <FlatButton
							    label="Cancel"
							    secondary={true}
							    onTouchTap={this.cancelSignUp} />,
							  <FlatButton
							    label="Sign Up"
							    primary={true}
							    onTouchTap={this.submitSignUp} />]}
				  		autoDetectWindowHeight={true} 
				  		autoScrollBodyContent={true}>
				    <div>
				    	<TextField
				    	  onEnterKeyDown = {this.submitSignUp}
				    	  ref="fullNameSignUp"
				    	  hintText="Christian Dennis"
				    	  onChange={this.validateFullName}
				    	  floatingLabelText="Full Name" /><br />
				    	<TextField
				    	  onEnterKeyDown = {this.submitSignUp}
				    	  ref="usernameSignUp"
				    	  hintText="christiandennis"
				    	  onChange={this.validateUsername}
				    	  floatingLabelText="Username" /><br />
				    	<TextField
				    	  onEnterKeyDown = {this.submitSignUp}
				    	  ref="schoolSignUp"
				    	  hintText="UC Berkeley"
				    	  onChange={this.validateSchool}
				    	  floatingLabelText="School" /><br />
				    	<TextField
				    	  onEnterKeyDown = {this.submitSignUp}
				    	  ref="emailSignUp"
				    	  hintText="christiandennis@studygroup.com"
				    	  onChange={this.validateEmail}
				    	  floatingLabelText="Email" /><br />
				    	<TextField
				    	  onEnterKeyDown = {this.submitSignUp}
				    	  ref="passwordSignUp"
				    	  hintText="Password"
				    	  onChange={this.validatePasswordMatch}
				    	  floatingLabelText="Password" 
				    	  type="password"/><br />
				    	<TextField
				    	  onEnterKeyDown = {this.submitSignUp}
				    	  ref="confirmPasswordSignUp"
				    	  hintText="must be hard!"
				    	  onChange={this.validatePasswordMatch}
				    	  floatingLabelText="Confirm Password"
				    	  type="password"/>
				    </div>
				</Dialog>

				<Snackbar
		       		ref = "unavailableEmailSnackbar"
		         	message="Email is already taken"
		         	autoHideDuration={5000}/>
		        <Snackbar
		       		ref = "unavailableUsernameSnackbar"
		         	message="Username is not available"
		         	autoHideDuration={5000}/>
		        <Snackbar
		       		ref = "failedSnackbar"
		         	message="Signup failed"
		         	autoHideDuration={5000}/>
		        <Snackbar
		       		ref = "passwordNotMatchSnackbar"
		         	message="Password doesn't match"
		         	autoHideDuration={5000}/>
	        </div>
		)
	}
})

module.exports = SignUpDialog;