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

var ProfileDialog = React.createClass({
	mixins: [History],

	cancelProfile() {
		this.refs.profileDialog.dismiss();
	},

	render() {
		return (
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
		)
	}
})

module.exports = ProfileDialog;