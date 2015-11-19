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

var LoginDialog = React.createClass({
	mixins: [History],

	submitLogIn() {
		console.log("login here");
		console.log("this.props", this.props);
		var user = this.refs.email.getValue();
		var password = this.refs.password.getValue();
		StudyGroupStore.fetchUser( user, password, this.history, this.refs.loginDialog);
	},

	cancelLogIn() {
		this.refs.loginDialog.dismiss();
	},

	render() {
		return (
			<Dialog ref="groupDetailDialog"
					title="StudyGroup Detail" 
					actions={[]}
					onShow={this.viewGroupDetailOnShow}
			  		autoDetectWindowHeight={true} 
			  		autoScrollBodyContent={true}>
			    <div>
			    	<div className="groupdesc-title">Class</div>
			    	<div ref="groupdetailClass" className="groupdesc-subtitle"></div>

			    	<div className="groupdesc-title">Title</div>
			    	<div ref="groupdetailTitle" className="groupdesc-subtitle"></div>

			    	<div className="groupdesc-title">Host</div>
			    	<div ref="groupdetailHost" className="groupdesc-subtitle"></div>

			    	<div className="groupdesc-title">Time</div>
			    	<div ref="groupdetailTime" className="groupdesc-subtitle"></div>

			    	<div className="groupdesc-title">Date</div>
			    	<div ref="groupdetailDate" className="groupdesc-subtitle"></div>

			    	<div className="groupdesc-title">Location</div>
			    	<div ref="groupdetailLocation" className="groupdesc-subtitle"></div>

			    	<div className="groupdesc-title">Description</div>
			    	<div ref="groupdetailDescription" className="groupdesc-subtitle"></div>

			    	<FlatButton label="Edit" onClick={this.editGroupDetail}/>

			    </div>
			</Dialog>
		)
	}
})

module.exports = LoginDialog;