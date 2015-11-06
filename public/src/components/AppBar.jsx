var React = require('react');
var render = require('react-dom').render;
var Link = require('react-router').Link;

var StudyGroupStore = require('../stores/StudyGroupStore');
var AltContainer = require('alt/AltContainer');

var LandingPage = require('./LandingPage.jsx');

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

var LeftBar = React.createClass({

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
	},

	myGroups() {
		console.log("trigger my-group-view here");
	},

	editProfile() {
		console.log("edit profile here");
	},

	logout() {
		console.log("user logout here");
	},

	render() {
		return(
			<SideBar ref="leftNav" docked={false}  >
				<MenuItem index={0} style={{textAlign:"center"}}>Hi, {this.props.user}!</MenuItem>
				<MenuItem index={1} style={{textAlign:"center", marginBottom:"20px"} }><span onClick={this.myProfile}><Avatar size="120"> {this.props.user.slice(0,1)} </Avatar></span></MenuItem>
				<span onClick={this.myGroups}>		<MenuItem index={2}>My Groups</MenuItem>	</span>
  				<span onClick={this.editProfile}>	<MenuItem index={3}>Edit Profile</MenuItem>	</span>
  				<span onClick={this.logout}>		<MenuItem index={4}>Log Out</MenuItem>		</span>
  			</SideBar>
		)
	}
})

var TopBar = React.createClass({
	dialogLogin() {
		this.refs.loginDialog.show();
	},

	cancelLogIn() {
		this.refs.loginDialog.dismiss();
	},

	submitLogIn() {
		this.refs.loginDialog.dismiss();
		this.login();
	},

	dialogSignUp() {
		this.refs.signUpDialog.show();
	},

	cancelSignUp() {
		this.refs.signUpDialog.dismiss();
	},

	submitSignUp() {
		this.refs.signUpDialog.dismiss();
		this.signUp();
	},

	dialogNewGroup() {
		this.refs.newGroupDialog.show();
	},

	cancelNewGroup() {
		this.refs.newGroupDialog.dismiss();
	},

	submitNewGroup() {
		var title = this.refs.createGroupTitle.getValue();
		var subject = this.refs.createGroupSubject.getValue();
		var description =  this.refs.createGroupDescription.getValue();
		var date = this.refs.createGroupDate.getDate();
		var location = this.refs.createGroupLocation.getValue();
		var capacity = 	this.refs.createGroupCapacity.getValue();
		var host = this.props.user;

		if (false) {
			console.log(title);
			console.log(subject);
			console.log(description);
			console.log(date);
			console.log(location);
			console.log(capacity);
			console.log(host);
		}

		var newGroupDialog = this.refs.newGroupDialog;
		var failedSnackbar = this.refs.createGroupFailedSnackbar;
		var successSnackbar = this.refs.createGroupSuccessSnackbar;

		axios.post(URL + "/groups", {
			"title": title,
			"subject": subject,
			"description": description,
			"date": date,
			"location": location,
			"capacity": capacity,
			"host": host
		}).then(function(response) {
			console.log("post new group SUCCEED");
			StudyGroupStore.fetchStudyGroups();	
			successSnackbar.show();
			newGroupDialog.dismiss();
		}).catch(function(response) {
			failedSnackbar.show();
			console.log("post new group FAILED");
		});
	},

	signUp() {
		var fullname = this.refs.fullNameSignUp.getValue();
		var email = this.refs.emailSignUp.getValue();
		var password = this.refs.passwordSignUp.getValue();
		var confirmPassword = this.refs.confirmPasswordSignUp.getValue();
		if(false) {
			console.log(fullname);
			console.log(email);
			console.log(password);
			console.log(confirmPassword);
			console.log("SIGNUP DONE");
		}
		axios.post("https://sheetsu.com/apis/72092a94", {
			"sessionID": password,
			"id" :email,
			"name" : fullname
		});
	},

	login() {
		console.log("login here");
		var user = this.refs.email.getValue();
		var password = this.refs.password.getValue();
		StudyGroupStore.fetchUser( user, password);
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
                   			  <Link to="/studygroupapp"><FlatButton
                   			    label="Submit"
                   			    primary={true}
                   			    onTouchTap={this.submitNewGroup} /></Link>]}
                     		autoDetectWindowHeight={true} 
                     		autoScrollBodyContent={true}>
                       <div>
                       	<TextField
                       		ref = "createGroupSubject"
                       	  hintText="CS169"
                       	  floatingLabelText="Class" />
                       	<TextField
                       		ref = "createGroupTitle"
                       	  hintText="Learn React together"
                       	  floatingLabelText="Title" />
                       	<TextField
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
                       		ref = "createGroupLocation"
                       	  hintText="Wozniak Longue, Soda Hall"
                       	  floatingLabelText="Location"/>
                       	<TextField
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
							  <Link to="/studygroupapp"><FlatButton
							    label="Log In"
							    primary={true}
							    onTouchTap={this.submitLogIn} /></Link>]}
				  		autoDetectWindowHeight={true} 
				  		autoScrollBodyContent={true}>
				    <div>
				    	<TextField
				    	  ref= "email"
				    	  hintText="christiandennis@studygroup.com"
				    	  floatingLabelText="Email" /><br />
				    	<TextField
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
				    	  ref="fullNameSignUp"
				    	  hintText="Christian Dennis"
				    	  floatingLabelText="Full Name" /><br />
				    	<TextField
				    	  ref="emailSignUp"
				    	  hintText="christiandennis@studygroup.com"
				    	  floatingLabelText="Email" /><br />
				    	<TextField
				    	  ref="passwordSignUp"
				    	  hintText="Password"
				    	  floatingLabelText="Password" 
				    	  type="password"/><br />
				    	<TextField
				    	  ref="confirmPasswordSignUp"
				    	  hintText="must be hard!"
				    	  floatingLabelText="Confirm Password"
				    	  type="password"/>
				    </div>
				</Dialog>
			</div>
		)
		

	}

})

module.exports =TopBar;