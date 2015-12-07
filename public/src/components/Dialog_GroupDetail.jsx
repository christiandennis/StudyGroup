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
const RaisedButton = require('material-ui/lib/raised-button');
const Paper = require('material-ui/lib/paper');

const moment = require('moment');
const helper = require('../helper/Helper_Dialog_GroupDetail');

var GroupDetailDialog = React.createClass({
	openEditGroupDialog() {
		if (!this.props.disabled){
			this.refs.groupDetailDialog.dismiss();
			this.refs.editGroupDialog.refs.editGroupDialog.show();
		}
	},

	render() {
		var studyGroup = this.props.studyGroup;
		var user = this.props.user;

		var date = helper.getDateString(studyGroup.date);
		var time = helper.getTimeString(studyGroup.date); 
		if(!this.props.studyGroup) {
			return (<div></div>);
		}
		if (user.nickname === studyGroup.host) {
			return (
				<div style={{backgroundColor:"#D9E7FC"}}>
					<Dialog_EditGroup ref='editGroupDialog' studyGroup={studyGroup}/>

					<Dialog ref="groupDetailDialog"
							bodyStyle={{backgroundColor:"#D9E7FC"}}
							actions={[]}
					  		autoDetectWindowHeight={true} 
					  		autoScrollBodyContent={true}>
					    	<div style={{textAlign:'center', fontSize:'40px'}}>
					    		{studyGroup.subject}: {studyGroup.title}
					    		<span style={{textAlign:'right', fontSize:'10px', color:'#0000FF', cursor:'pointer'}} onClick={this.openEditGroupDialog}>
					    			Edit
					    		</span>
					    	</div>
					    	<div style={{textAlign:'center', fontSize:'15px'}}>
					    		by {studyGroup.host}
					    	</div>
					    	<br/>
					    	<div className="groupdesc-title" style={{textAlign:'center'}}>Description</div>
					    	<div style={{textAlign:'center', fontSize:'20px'}}>
					    		{studyGroup.description}
					    	</div>

					    	<br/>
				    		<div style={{textAlign:'left'}}> {studyGroup.location} </div>
				    		<div style={{textAlign:'left'}}> {date} at {time} </div>
				    		<br/>

					    <Comments studyGroup={studyGroup}/>
					</Dialog>
				</div>
			);
		} else {
			return (
				<div style={{backgroundColor:"#D9E7FC"}}>
					<Dialog_EditGroup ref='editGroupDialog' studyGroup={studyGroup}/>

					<Dialog ref="groupDetailDialog"
							bodyStyle={{backgroundColor:"#D9E7FC"}}
							actions={[]}
					  		autoDetectWindowHeight={true} 
					  		autoScrollBodyContent={true}>
					    	<div style={{textAlign:'center', fontSize:'40px'}}>
					    		{studyGroup.subject}: {studyGroup.title}
					    	</div>
					    	<div style={{textAlign:'center', fontSize:'15px'}}>
					    		by {studyGroup.host}
					    	</div>
					    	<br/>
					    	<div className="groupdesc-title" style={{textAlign:'center'}}>Description</div>
					    	<div style={{textAlign:'center', fontSize:'20px'}}>
					    		{studyGroup.description}
					    	</div>

					    	<br/>
				    		<div style={{textAlign:'left'}}> {studyGroup.location} </div>
				    		<div style={{textAlign:'left'}}> {date} at {time} </div>
				    		<br/>

					    <Comments studyGroup={studyGroup}/>
					</Dialog>
				</div>
			)
		}
	}
})


module.exports = GroupDetailDialog;