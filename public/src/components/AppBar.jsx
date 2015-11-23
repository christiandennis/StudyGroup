// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');
var History = Router.History;
var AltContainer = require('alt/AltContainer');

var StudyGroupStore = require('../stores/StudyGroupStore');
var StudyGroupActions = require('../actions/StudyGroupActions');

// import components
var LandingPage = require('./LandingPage.jsx');
var Dialog_LogIn = require('./Dialog_LogIn.jsx');
var Dialog_SignUp = require('./Dialog_SignUp.jsx');
var Dialog_NewGroup = require('./Dialog_NewGroup.jsx');
var Dialog_Profile = require('./Dialog_Profile.jsx');
var Dialog_MyGroups = require('./Dialog_MyGroups.jsx');
const TextField = require('material-ui/lib/text-field');

var ReactTestUtils = require('react-addons-test-utils');

// material ui components
const AppBar = require('material-ui/lib/app-bar');
const FlatButton = require('material-ui/lib/flat-button');
const SideBar = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menu/menu-item');
const Avatar = require('material-ui/lib/avatar');
const Snackbar = require('material-ui/lib/snackbar');
const IconButton = require('material-ui/lib/icon-button');

// custom material ui theme
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LeftBarTheme = require('../themes/LeftBarTheme.js');
const AppBarTheme = require('../themes/AppBarTheme.js');

// sticky headers
const Sticky = require('react-sticky');

var typingTimer;

var LeftBar = React.createClass({
	mixins: [History],

	childContextTypes : {
	    muiTheme: React.PropTypes.object
	},

	getChildContext() {
		return {
		  muiTheme: ThemeManager.getMuiTheme(AppBarTheme)
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
		StudyGroupStore.signOut(this.history);
	},

	render() {
		return(
			<div>
				<SideBar ref="leftNav" docked={false}  >
					<MenuItem index={0} style={{textAlign:"center"}}>Hi, {this.props.user.name}!</MenuItem>
					<MenuItem index={1} style={{textAlign:"center", marginBottom:"20px"} }><span onClick={this.myProfile}><Avatar size={120} backgroundColor='#0D47A1'> {this.props.user.name.slice(0,1).toUpperCase()} </Avatar></span></MenuItem>
	  				<span onClick={this.editProfile}>	<MenuItem index={3}>Edit Profile</MenuItem>	</span>
	  				<span onClick={this.logout}>		<MenuItem index={4}>Log Out</MenuItem>		</span>
	  			</SideBar>

	  			<Dialog_Profile ref='profileDialog' user={this.props.user}/>
			</div>
		)
	}
})


var TopBar = React.createClass({
	mixins: [History],
	childContextTypes : {
	    muiTheme: React.PropTypes.object,
	},

	getChildContext() {
	    return {
	      	muiTheme: ThemeManager.getMuiTheme(LeftBarTheme),
	    };
	},
	
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

    refresh() {
    	StudyGroupStore.fetchStudyGroups();	
    	StudyGroupStore.fetchMyGroups();
    },

    startTypingTimer() {
    	clearTimeout(typingTimer);
    	var searchTerm = this.refs.searchField.getValue();
    	typingTimer = setTimeout(function(){StudyGroupStore.searchGroups(searchTerm);}, 50);
    },

    clearTypingTimer() {
    	clearTimeout(typingTimer);
    },

    directSearch() {
    	// use this for non-direct search
    	// onKeyDown={this.clearTypingTimer}
		// onKeyUp={this.startTypingTimer}
		StudyGroupActions.setSearchTerm(this.refs.searchField.getValue());
    	StudyGroupStore.searchGroups(this.refs.searchField.getValue());
    },

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
							  	onLeftIconButtonTouchTap={this.openLeft}>
							  		<IconButton iconClassName="material-icons" 
							  					disabled={true}
							  					style={{
							  						height:'inherit',
							  						marginTop:'4px',
							  						marginRight:'-10px'}}
							  					iconStyle={{fontSize:'24px', color:'#CCCCCC'}}>search</IconButton>
							  		<TextField
							  			ref='searchField'
							  			value={this.props.searchTerm}
							  		  	hintText="Search Study Groups" 
						  		  		style = {{
						  		  					marginTop:'8px', 
						  		  					marginRight:'5px',
						  		  					width:'150px'}}
						  		  	  	inputStyle={{
						  		  	  				color:'#D3D3D3',
						  		  	  				fontSize:'12px'}}
						  		  	  	underlineStyle={{color:'#FEFEFE'}}
						  		  	  	hintStyle={{
						  		  	  				color:'#CCCCCC',
						  		  	  				fontSize:'12px'}}
						  		  	  	onChange={this.directSearch}
						  		  	  	onClick={this.directSearch}/>
							  		<IconButton iconClassName="material-icons" 
							  					style={{height:'inherit'}}
							  					iconStyle={{fontSize:'24px', color:'rgba(255, 255, 255, 1)'}} 
							  					tooltip="Refresh"
							  					onClick={this.refresh}>refresh</IconButton>
							  		<IconButton iconClassName="material-icons" 
							  					style={{height:'inherit'}}
							  					iconStyle={{fontSize:'24px', color:'rgba(255, 255, 255, 1)'}} 
							  					tooltip="Create New Group"
							  					onClick={this.dialogNewGroup}>add</IconButton>
							  	</AppBar>
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
		              zDepth={5}
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