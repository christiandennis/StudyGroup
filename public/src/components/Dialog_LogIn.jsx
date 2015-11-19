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

var LoginDialog = React.createClass({
	mixins: [History],

	submitLogIn() {
		console.log("login here");
		console.log("this.props", this.props);
		var user = this.refs.email.getValue();
		var password = this.refs.password.getValue();
		StudyGroupStore.fetchUser( user, password, this.history, this.refs.loginDialog, this.refs.loginFailedSnackbar);
	},

	cancelLogIn() {
		this.refs.loginDialog.dismiss();
	},

	render() {
		return (
			<div>
				<Dialog ref="loginDialog" 
						title="Log In" 
						actions={[
							  <FlatButton
							    label="Cancel"
							    secondary={true}
							    onTouchTap={this.cancelLogIn} />,
							  <FlatButton
							    label="Log In"
							    primary={true}
							    onTouchTap={this.submitLogIn} />]}
				  		autoDetectWindowHeight={true} 
				  		autoScrollBodyContent={true}>

				    <TextField
				      onEnterKeyDown = {this.submitLogIn}
				      ref= "email"
				      hintText="christiandennis@studygroup.com"
				      floatingLabelText="Email" /><br />
				    <TextField
				      onEnterKeyDown = {this.submitLogIn}
				      ref= "password"
				      hintText="Password"
				      floatingLabelText="Password" 
				      type="password"/><br />
				</Dialog>

	    		<Snackbar
	           		ref = "loginFailedSnackbar"
	             	message="Invalid login credentials"
	             	autoHideDuration="5000"/>
            </div>
		)
	}
})

module.exports = LoginDialog;