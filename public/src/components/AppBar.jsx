// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');
var History = Router.History;
var StudyGroupStore = require('../stores/StudyGroupStore');
var AltContainer = require('alt/AltContainer');

// import components
var LandingPage = require('./LandingPage.jsx');
var MyGroups = require('./MyGroups.jsx');
var Dialog_LogIn = require('./Dialog_LogIn.jsx');
var Dialog_SignUp = require('./Dialog_SignUp.jsx');
var Dialog_NewGroup = require('./Dialog_NewGroup.jsx');

var ReactTestUtils = require('react-addons-test-utils');

// material ui components
const AppBar = require('material-ui/lib/app-bar');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const SideBar = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menu/menu-item');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const Avatar = require('material-ui/lib/avatar');
const Snackbar = require('material-ui/lib/snackbar');

// custom material ui theme
const MyRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme.js');
const MyRawTheme2 = require('material-ui/lib/styles/raw-themes/sidebar-theme.js');

// sticky headers
const Sticky = require('react-sticky');

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
		this.refs.myGroupsDialog.show();
	},

	editProfile() {
		console.log("edit profile here");
	},

	logout() {
		StudyGroupStore.signOut(this.props.user.uid, this.props.user.accesstoken, this.props.user.client, this.history);
	},

	closeMygroupsDialog() {
		this.refs.myGroupsDialog.dismiss();
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

				<Dialog ref="myGroupsDialog"
						autoDetectWindowHeight={true}
  						autoScrollBodyContent={true}
  						modal={true}
  						actions={[
								  <FlatButton
								    label="Dismiss"
								    secondary={true}
								    onTouchTap={this.closeMygroupsDialog} />,
							  	]}>
					<MyGroups/>
				</Dialog>
			</div>
		)
	}
})


var TopBar = React.createClass({
	mixins: [History],

	dialogLogin() {
		// this.refs.loginDialog.refs.loginDialog.show();
		// BYPASS LOGIN FOR TESTING
		StudyGroupStore.fetchUser( 'papa@gmail.com', 'iopiopiop', this.history, this.refs.loginDialog);
	},

	dialogSignUp() {
		this.refs.signUpDialog.refs.signUpDialog.show();
	},

	dialogNewGroup() {
		this.refs.newGroupDialog.refs.newGroupDialog.show();
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
                	<div style={{zIndex:"1000", paddingBottom:"64px"}}>
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

                    <Dialog_NewGroup ref='newGroupDialog' user={this.props.user}/>

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
				<Sticky stickyStyle={{zIndex:"1000", paddingBottom:"64px"}}>
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

				<LandingPage dialogSignUp={this.dialogSignUp} />

				<Dialog_LogIn ref='loginDialog' />

				<Dialog_SignUp ref='signUpDialog' />
			</div>
		)
		

	}

})

module.exports = TopBar;