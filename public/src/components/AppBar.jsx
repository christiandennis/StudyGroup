var React = require('react');
var render = require('react-dom').render;
var Link = require('react-router').Link;

var StudyGroupStore = require('../stores/StudyGroupStore');
var AltContainer = require('alt/AltContainer');

var LandingPage = require('./LandingPage.jsx');
var ReactTestUtils = require('react-addons-test-utils');

const AppBar = require('material-ui/lib/app-bar');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');
const SideBar = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menu/menu-item');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const MyRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme.js');
const MyRawTheme2 = require('material-ui/lib/styles/raw-themes/sidebar-theme.js');
const Avatar = require('material-ui/lib/avatar');
const Checkbox = require('material-ui/lib/checkbox');
const Snackbar = require('material-ui/lib/snackbar');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker/time-picker');

const Sticky = require('react-sticky');

const URL = "http://localhost:3000";
var axios = require('axios');

var Router = require('react-router');
var History = Router.History;


var LeftBar = React.createClass({
	mixins: [History],

	childContextTypes : {
	    muiTheme: React.PropTypes.object
	},

	getChildContext() {
		return {
		  muiTheme: ThemeManager.getMuiTheme(MyRawTheme2)
		};
	},

	myProfile() {
		console.log("view my profile here");
		this.refs.profileDialog.show();
	},

	cancelProfile() {
		console.log("dismiss profile");
		this.refs.profileDialog.dismiss();
	},

	viewProfileShow() {
		console.log("render profile");
	},

	myGroups() {
		console.log("trigger my-group-view here");
	},

	editProfile() {
		console.log("edit profile here");
	},

	logout() {
		StudyGroupStore.signOut(this.props.user.uid, this.props.user.accesstoken, this.props.user.client, this.history);
	},

	render() {
		return(
			<div>
				<SideBar ref="leftNav" docked={false}  >
					<MenuItem index={0} style={{textAlign:"center"}}>Hi, {this.props.user.name}!</MenuItem>
					<MenuItem index={1} style={{textAlign:"center", marginBottom:"20px"} }><span onClick={this.myProfile}><Avatar size="120"> {this.props.user.name.slice(0,1)} </Avatar></span></MenuItem>
					<span onClick={this.myGroups}>		<MenuItem index={2}>My Groups</MenuItem>	</span>
	  				<span onClick={this.editProfile}>	<MenuItem index={3}>Edit Profile</MenuItem>	</span>
	  				<span onClick={this.logout}>		<MenuItem index={4}>Log Out</MenuItem>		</span>
	  			</SideBar>

	  			<Dialog ref="profileDialog" 
							title="My Profile" 
							actions={[
								  <FlatButton
								    label="Dismiss"
								    secondary={true}
								    onTouchTap={this.cancelProfile} />,
								  ]}
							onShow={this.viewProfileShow}
					  		autoDetectWindowHeight={true} 
					  		autoScrollBodyContent={true}>
					    <div>
					    	<div ref="profileName" style={{fontSize:"30px", paddingBottom:"20px"}}>{this.props.user.name}</div>
					    	<div ref="profileEmail" className="prof-email">{this.props.user.email}</div>
					    	<div ref="profileClass" className="prof-class">{this.props.user.school}</div>
					    </div>
					</Dialog>
			</div>
		)
	}
})


var TopBar = React.createClass({
	mixins: [History],

	dialogLogin() {
		// this.refs.loginDialog.show();
		// BYPASS LOGIN FOR TESTING
		StudyGroupStore.fetchUser( 'papa@gmail.com', 'iopiopiop', this.history, this.refs.loginDialog);
	},

	cancelLogIn() {
		this.refs.loginDialog.dismiss();
	},

	submitLogIn() {
		console.log("login here");
		var user = this.refs.email.getValue();
		var password = this.refs.password.getValue();
		StudyGroupStore.fetchUser( user, password, this.history, this.refs.loginDialog);
	},

	dialogSignUp() {
		this.refs.signUpDialog.show();
	},

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

	dialogNewGroup() {
		this.refs.newGroupDialog.show();
	},

	cancelNewGroup() {
		this.refs.newGroupDialog.dismiss();
	},

	submitNewGroup() {
		var title = this.refs.createGroupTitle;
		var subject = this.refs.createGroupSubject;
		var description =  this.refs.createGroupDescription;
		var date = this.refs.createGroupDate;
		var location = this.refs.createGroupLocation;
		var capacity = 	this.refs.createGroupCapacity;
		var host = this.props.user;
		var privacy = 0;
		if (this.refs.createGroupPrivacy.isChecked()){
			privacy = 1;
		}

		if (false) {
			console.log(title.getValue());
			console.log(subject.getValue());
			console.log(description.getValue());
			console.log(date);
			console.log(location.getValue());
			console.log(capacity.getValue());
			console.log(host);
		}

		var newGroupDialog = this.refs.newGroupDialog;
		var failedSnackbar = this.refs.createGroupFailedSnackbar;
		var successSnackbar = this.refs.createGroupSuccessSnackbar;

		if (title.getValue() && subject.getValue() && description.getValue() && location.getValue() && capacity.getValue() && date.getDate()) {
			StudyGroupStore.postNewGroup(title, subject, description, date, location, capacity, host, this.props.user.school, privacy, this.history, newGroupDialog);
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
			if (!date.getDate()){
				date.setErrorText("This field is required");
			}

		}
	},

	validateGroupSubject() {
		var subject = this.refs.createGroupSubject;
		if (subject.getValue()) {
			subject.setErrorText("");
			return true;
		} else {
			subject.setErrorText("This field is required grrr");
			return false;
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

	updateUser(){

	},
    
    openLeft() {
        this.refs.leftBar.refs.leftNav.toggle();
    },
    
    getStyle() {
        console.log("style executed")
        return {

        }
    },

    // THEME
	childContextTypes : {
	    muiTheme: React.PropTypes.object,
	  },

	  getChildContext() {
	    return {
	      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
	    };
	  },

// END THEME

	render() {
		if (this.props.user) {
			return (
                
                <div>
                	<div style={{zIndex:"1000",
										paddingBottom:"64px"}}>
						<Sticky>
							<AppBar
							  title="StudyGroup" 
							  style = {{
							    backgroundColor: '#0D47A1 !important',
							  }}
							  onLeftIconButtonTouchTap={this.openLeft}
							  iconElementRight={ <FlatButton label="New StudyGroup" onClick={this.dialogNewGroup}/>}/>
						</Sticky>
                	</div>
                    
                    <LeftBar ref="leftBar" user={this.props.user}/>

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
			);
		}
			
		return (
			<div>

				<Sticky stickyStyle={{zIndex:"1000",
									paddingBottom:"64px"}}>
					<AppBar
					  className = "logo-title"
		              title="StudyGroup"
		              style = {{
		                backgroundColor: '#0D47A1 !important',
		                position: 'fixed',
		                marginBottom: '64px'
		              }}
		              zDepth="100"
					  showMenuIconButton={false}
					  iconElementRight={<FlatButton label="Log In" onClick={this.dialogLogin}/>} />
				</Sticky>

				<LandingPage dialogSignUp={this.dialogSignUp}/>

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
				    <div>
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
				    </div>
				</Dialog>

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
				    	  onChange={this.validateFullName}
				    	  floatingLabelText="Username" /><br />
				    	<TextField
				    	  onEnterKeyDown = {this.submitSignUp}
				    	  ref="schoolSignUp"
				    	  hintText="UC Berkeley"
				    	  onChange={this.validateFullName}
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
			</div>
		)
		

	}

})

module.exports =TopBar;