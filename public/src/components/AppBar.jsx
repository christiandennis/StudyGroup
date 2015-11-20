// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');
var History = Router.History;
var StudyGroupStore = require('../stores/StudyGroupStore');
var AltContainer = require('alt/AltContainer');

// import components
var LandingPage = require('./LandingPage.jsx');
var Dialog_LogIn = require('./Dialog_LogIn.jsx');
var Dialog_SignUp = require('./Dialog_SignUp.jsx');
var Dialog_NewGroup = require('./Dialog_NewGroup.jsx');
var Dialog_Profile = require('./Dialog_Profile.jsx');
var Dialog_MyGroups = require('./Dialog_MyGroups.jsx');

var ReactTestUtils = require('react-addons-test-utils');

// material ui components
const AppBar = require('material-ui/lib/app-bar');
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
		this.refs.profileDialog.refs.profileDialog.show();
	},

	myGroups() {
		this.refs.myGroupsDialog.refs.myGroupsDialog.show();
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
					<MenuItem index={1} style={{textAlign:"center", marginBottom:"20px"} }><span onClick={this.myProfile}><Avatar size={120}> {this.props.user.name.slice(0,1)} </Avatar></span></MenuItem>
					<span onClick={this.myGroups}>		<MenuItem index={2}>My Groups</MenuItem>	</span>
	  				<span onClick={this.editProfile}>	<MenuItem index={3}>Edit Profile</MenuItem>	</span>
	  				<span onClick={this.logout}>		<MenuItem index={4}>Log Out</MenuItem>		</span>
	  			</SideBar>

	  			<Dialog_Profile ref='profileDialog' user={this.props.user}/>
	  			<Dialog_MyGroups ref='myGroupsDialog' />
			</div>
		)
	}
})


var TopBar = React.createClass({
	dialogLogin() {
		this.refs.loginDialog.refs.loginDialog.show();
		// BYPASS LOGIN FOR TESTING
		// StudyGroupStore.fetchUser( 'papa@gmail.com', 'iopiopiop', this.history, this.refs.loginDialog);
	},

	dialogSignUp() {
		this.refs.signUpDialog.refs.signUpDialog.show();
	},

	dialogNewGroup() {
		this.refs.newGroupDialog.refs.newGroupDialog.show();
	},

	refreshGroups() {
		StudyGroupStore.fetchStudyGroups();
	},

	updateUser(){

	},
    
    openLeft() {
        this.refs.leftBar.refs.leftNav.toggle();
    },
    
    getStyle() {
        // console.log("style executed")
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
							  iconElementRight={<FlatButton label="New StudyGroup" onClick={this.dialogNewGroup}/>}
							  onLeftIconButtonTouchTap={this.openLeft}/>
						</Sticky>
                	</div>
                    
                    <LeftBar ref="leftBar" user={this.props.user}/>
                    <Dialog_NewGroup ref='newGroupDialog' user={this.props.user}/>
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