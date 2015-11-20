// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');
var StudyGroupStore = require('../stores/StudyGroupStore');
 
var Dialog_EditGroup = require('./Dialog_EditGroup.jsx');
var Comments = require('./Comments.jsx');

// Matertial UI components
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const Paper = require('material-ui/lib/paper');

const moment = require('moment');

var GroupDetailDialog = React.createClass({
	openEditGroupDialog() {
		this.refs.groupDetailDialog.dismiss();
		this.refs.editGroupDialog.refs.editGroupDialog.show();
	},

	getTimeString(time) {
		var d = new Date(0);
		d.setUTCSeconds(Number(time));
		return moment(d).format("h:mm a").toString();
	},

	getDateString(date) {
		var d = new Date(0);
		d.setUTCSeconds(Number(date));
		return moment(d).format("ddd, MMM D").toString();
	},

	render() {
		var studyGroup = this.props.studyGroup;
		var user = this.props.user;

		var date = this.getDateString(studyGroup.date);
		var time = this.getTimeString(studyGroup.date);

		if (user.nickname === studyGroup.host) {
			return (
				<div>
					<Dialog_EditGroup ref='editGroupDialog' studyGroup={studyGroup}/>

					<Dialog ref="groupDetailDialog"
							title="StudyGroup Detail"
							style = {{textAlign:"center", color:"#0D47A1 !important"}} 
							actions={[]}
					  		autoDetectWindowHeight={true} 
					  		autoScrollBodyContent={true}>
					    <Paper zDepth={2}
					    style = {{paddingTop:"20px"}}>
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

					    </Paper>
					</Dialog>

					<Comments studyGroup={studyGroup}/>
					
				</div>
			);
		} else {
			return (
				<div>
					<Dialog ref="groupDetailDialog"
							title="StudyGroup Detail"
							style = {{textAlign:"center", color:"#0D47A1 !important"}} 
							actions={[]}
					  		autoDetectWindowHeight={true} 
					  		autoScrollBodyContent={true}>
					    <Paper zDepth={2}
					    style = {{paddingTop:"20px", paddingBottom:"20px"}}>
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
					    </Paper>

					</Dialog>

					<Comments studyGroup={studyGroup}/>

				</div>
			)
		}
	}
})


module.exports = GroupDetailDialog;