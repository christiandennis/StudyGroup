// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');
var History = Router.History;
var StudyGroupStore = require('../stores/StudyGroupStore');

var Dialog_EditGroup = require('./Dialog_EditGroup.jsx');

// Matertial UI components
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');

const moment = require('moment');

var GroupDetailDialog = React.createClass({
	mixins: [History],

	openEditGroupDialog() {
		this.refs.groupDetailDialog.dismiss();
		this.refs.editGroupDialog.refs.editGroupDialog.show();
	},

	render() {
		var studyGroup = this.props.studyGroup;
		var date = moment(studyGroup.date).format("ddd, MMM D").toString();
		var time = moment(studyGroup.date).format("h:mm a").toString();
		return (
			<div>
				<Dialog_EditGroup ref='editGroupDialog' studyGroup={studyGroup}/>

				<Dialog ref="groupDetailDialog"
						title="StudyGroup Detail" 
						actions={[]}
				  		autoDetectWindowHeight={true} 
				  		autoScrollBodyContent={true}>
				    <div>
				    	<div className="groupdesc-title">Class</div>
				    	<div ref="groupdetailClass" className="groupdesc-subtitle">{studyGroup.subject}</div>

				    	<div className="groupdesc-title">Title</div>
				    	<div ref="groupdetailTitle" className="groupdesc-subtitle">{studyGroup.title}</div>

				    	<div className="groupdesc-title">Host</div>
				    	<div ref="groupdetailHost" className="groupdesc-subtitle">{studyGroup.host}</div>

				    	<div className="groupdesc-title">Date</div>
				    	<div ref="groupdetailDate" className="groupdesc-subtitle">{date}</div>

				    	<div className="groupdesc-title">Time</div>
				    	<div ref="groupdetailTime" className="groupdesc-subtitle">{time}</div>

				    	<div className="groupdesc-title">Location</div>
				    	<div ref="groupdetailLocation" className="groupdesc-subtitle">{studyGroup.location}</div>

				    	<div className="groupdesc-title">Description</div>
				    	<div ref="groupdetailDescription" className="groupdesc-subtitle">{studyGroup.description}</div>

				    	<FlatButton label="Edit" onClick={this.openEditGroupDialog}/>

				    </div>
				</Dialog>
			</div>
		)
	}
})

module.exports = GroupDetailDialog;