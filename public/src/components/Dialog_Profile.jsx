// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');

var StudyGroupStore = require('../stores/StudyGroupStore');

// Matertial UI components
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const Paper = require('material-ui/lib/paper');

const ThemeManager = require('material-ui/lib/styles/theme-manager');
const MyProfileTheme = require('../themes/MyProfileTheme.js');

var ProfileDialog = React.createClass({
	childContextTypes : {
	    muiTheme: React.PropTypes.object,
	},

	getChildContext() {
	    return {
	      	muiTheme: ThemeManager.getMuiTheme(MyProfileTheme),
	    };
	},

	cancelProfile() {
		this.refs.profileDialog.dismiss();
	},

	render() {
		return (
			<Dialog ref="profileDialog" 
					bodyStyle={{background:"linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('books.jpg') no-repeat"}}
					onShow={this.viewProfileShow}
					style = {{textAlign:"center"}}
			  		autoDetectWindowHeight={true} 
			  		autoScrollBodyContent={true}>
			    	<div className="profile-box"
			    	style={{paddingTop:"50px", paddingBottom:"50px"}}>
				    	<div style={{fontWeight:"bold", fontSize:"30px", paddingBottom:"20px", color:"#FFFFFF"}} ref="profileName" >{this.props.user.name}</div>
				    	<div ref="profileEmail"  className="prof-email" style = {{paddingBottom:"20px", color:"#FFFFFF"}}>{this.props.user.email}</div>
				    	<div style={{fontWeight:"100", fontSize:"15px", textAlign:"right", paddingRight:"20px", bottom:"0", color:"#FFFFFF"}} ref="profileClass" className="prof-class">{this.props.user.school}</div>
			    	</div>
			</Dialog>
		)
	}
})

module.exports = ProfileDialog;