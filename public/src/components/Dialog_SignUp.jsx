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
		if(false) {
			console.log(fullname);
			console.log(email);
			console.log(password);
			console.log(confirmPassword);
			console.log("SIGNUP DONE");
		}

		if (email.getValue() && password.getValue() && confirmPassword.getValue() && fullname.getValue()){
			if (confirmPassword.getValue() === password.getValue()){
				StudyGroupStore.signUp(fullname, fullnameSignUp, email, password, confirmPassword, schoolSignUp, usernameSignUp, signUpDialog);
			}
		} else {
			if (!email.getValue()){
				email.setErrorText("This field is required");
			} else if (email.getValue().search("@")==-1){
				email.setErrorText("Invalid email");
			}

			if (!password.getValue()) {
				password.setErrorText("This field is required");
			}
			if(!confirmPassword.getValue()){
				confirmPassword.setErrorText("This field is required");
			}
			if (!fullname.getValue()){
				fullname.setErrorText("This field is required");
			}
		}
	},

	validateFullName() {
		var fullname = this.refs.fullNameSignUp;
		if (fullname.getValue()){
			fullname.setErrorText("");
			return true;
		} else {
			fullname.setErrorText("This field is required");
			return false;
		}
	},

	validateUsername() {
		var fullname = this.refs.usernameSignUp;
		if (fullname.getValue()){
			fullname.setErrorText("");
			return true;
		} else {
			fullname.setErrorText("This field is required");
			return false;
		}
	},

	validateSchool() {
		var fullname = this.refs.schoolSignUp;
		if (fullname.getValue()){
			fullname.setErrorText("");
			return true;
		} else {
			fullname.setErrorText("This field is required");
			return false;
		}
	},

	validateEmail() {
		var email = this.refs.emailSignUp;
		if (email.getValue()){
			var at = email.getValue().search("@");
			if (at!=-1) {
				var dot = email.getValue().slice(at).search(".");
				if (dot!=-1){
					email.setErrorText("");
					return true;
				} else {
					email.setErrorText("Invalid email");
				}
			} else {
				email.setErrorText("Invalid email");
				return false;
			}
		} else {
			email.setErrorText("Invalid email");
			return false;
		}
	},

	validatePasswordMatch() {
		var password = this.refs.passwordSignUp;
		var confirmPassword = this.refs.confirmPasswordSignUp;
		if (password.getValue()===confirmPassword.getValue()) {
			password.setErrorText("");
			confirmPassword.setErrorText("");
			if(password.getValue().length < 8){
				password.setErrorText("Password must be at least 8 characters");
				confirmPassword.setErrorText("Password must be at least 8 characters");
				return false;
			}
			return true;
		} else {
			if(password.getValue().length < 8){
				password.setErrorText("Password must be at least 8 characters");
				confirmPassword.setErrorText("Password must be at least 8 characters");
				return false;
			} else {
				password.setErrorText("Password must match");
				confirmPassword.setErrorText("Password must match");
				return false;
			}
		}
	},

	render() {
		return (
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
		)
	}
})

module.exports = SignUpDialog;