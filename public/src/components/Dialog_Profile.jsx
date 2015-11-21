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

var ProfileDialog = React.createClass({
	cancelProfile() {
		this.refs.profileDialog.dismiss();
	},

	render() {
		return (
			<Dialog ref="profileDialog" 
					actions={[
						  <FlatButton
						    label="Dismiss"
						    secondary={true}
						    onTouchTap={this.cancelProfile} />,
						  ]}
					onShow={this.viewProfileShow}
					style = {{textAlign:"center"}}
			  		autoDetectWindowHeight={true} 
			  		autoScrollBodyContent={true}>
			    <Paper
			    zDepth={2}
			    rounded = {true}
			    style={{backgroundColor:"white"}}>
			    	<div className="profile-box"
			    	style={{paddingTop:"50px", paddingBottom:"50px"}}>
				    	<div style={{fontWeight:"bold", fontSize:"30px", paddingBottom:"20px"}} ref="profileName" >{this.props.user.name}</div>
				    	<div ref="profileEmail"  className="prof-email" style = {{paddingBottom:"20px"}}>{this.props.user.email}</div>
				    	<div style={{fontWeight:"100", fontSize:"15px", textAlign:"right", paddingRight:"20px", bottom:"0"}} ref="profileClass" className="prof-class">{this.props.user.school}</div>
			    	</div>
			    </Paper>
			</Dialog>
		)
	}
})

module.exports = ProfileDialog;