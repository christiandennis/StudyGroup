// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');
var StudyGroupStore = require('../stores/StudyGroupStore');

// import components
var Dialog_GroupDetail = require('./Dialog_GroupDetail.jsx');

// Matertial UI components
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const RaisedButton = require('material-ui/lib/raised-button');
const Paper = require('material-ui/lib/paper');
const Avatar = require('material-ui/lib/avatar');
const FontIcon = require('material-ui/lib/font-icon');

const moment = require('moment');

var MainGroupViewCard = React.createClass({
	openGroupDetailDialog() {
		this.refs.groupDetailDialog.refs.groupDetailDialog.show();
	},

	calculateTimeColor(card_date) {
		var card_epoch = Number(card_date);
		var curr_time = new Date().toString();
		var curr_epoch = moment(curr_time).unix();
		var time_diff = card_epoch - curr_epoch;

		if (time_diff >= 259200) {
			return 'colorBarGreen';
		} else if (time_diff >= 86400) {
			return 'colorBarYellow';
		} else if (time_diff >= 0) {
			return 'colorBarRed';
		} else {
			return 'colorBarBlack';
		}
	},

	joinLeaveGroup(joinOrLeave) {
		// some logic to determine whether to join or to leave
		if (joinOrLeave.joinText === 'Dismiss') {
			this.refs.dismissConfirmation.show();
		} else if (joinOrLeave.joinText === 'Leave') {
			StudyGroupStore.joinOrLeaveGroup(this.props.studyGroup.id, 'remove');
		} else if (joinOrLeave.joinText === 'Join'){
			StudyGroupStore.joinOrLeaveGroup(this.props.studyGroup.id, 'add');
		}
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

	checkUserGoing(studyGroup, user) {
		for (var i in studyGroup.users) {
	     	if (studyGroup.users[i].id === user.id) {
	       		return true;
	     	}
	   	}
	   	return false;
	},

	getJoinText(studyGroup, user) {
		if (studyGroup.host === user.nickname) {
			return 'Dismiss';
		} else if(this.checkUserGoing(studyGroup, user)) {
			return 'Leave';
		} else if (studyGroup.guestlist === studyGroup.capacity) {
			return 'Full';
		} else {
			return 'Join';
		}
	},

	confirmDismiss() {
		StudyGroupStore.dismissGroup(this.props.studyGroup.id);
	},

	checkDisabled(studyGroup) {
		var curr_epoch = moment(new Date().toString()).unix();
		return (studyGroup.date < curr_epoch);
	},

	render() {
		var studyGroup = this.props.studyGroup;
		var user = this.props.user;

		var date = this.getDateString(studyGroup.date);
		var time = this.getTimeString(studyGroup.date);
		var color = this.calculateTimeColor(studyGroup.date);	
		var joinText = this.getJoinText(studyGroup, user);
		var disabled = this.checkDisabled(studyGroup);

		return (
			<div key={studyGroup.id}>
				<Dialog_GroupDetail ref='groupDetailDialog' studyGroup={studyGroup} user={user} disabled={disabled}/>
				<Dialog
					ref="dismissConfirmation"
				  	title="Are you sure you want to delete this group?"
				  	actions={[
							  	{ text: 'Cancel' },
							  	{ text: 'Yes', onTouchTap: this.confirmDismiss }
							]}
				  	actionFocus="submit"
				  	onRequestClose={this._handleRequestClose}>
				  	This action cannot be undone.
				</Dialog>

		        <Paper zDepth={3} className="card-container">
			        <div className="card studyGroup">
			            <div className={color}></div>
			            <div className='cardContent'>
					        <div className='row1'>
					        	<div className='column11 noBlur'>
					        		<Avatar size={70} className='centerVertical'> {studyGroup.host.slice(0,1).toUpperCase()} </Avatar>
					        	</div>
					        	<div className='column12'>
					        		<div className='column121'>
					        			<div className="subject">{studyGroup.subject}</div>
					        		</div>
					        		<div className='column122'>
					        			<div className="title">{studyGroup.title}</div>
					        		</div>
					        	</div>
					        	<div className='column13'>
					        		<div className="date">{date}</div>
                    				<div className="time">{time}</div>
					        	</div>
					        </div>
					        <div className='row2'>
					        	<div className='column11 noBlur'>
					        		<FontIcon className="material-icons centerVertical" style={{fontSize:'48px', color:'grey'}}>info_outline</FontIcon>
					        	</div>
					        	<div className='column22 noBlur'>
					        		<div className="description centerVertical">
						        		{studyGroup.description}
						        		<div className="seeMore" onClick={this.openGroupDetailDialog} >See More...</div>
					        		</div>
					        	</div>
					        </div>
					        <div className='row3'>
					        	<div className='column11 noBlur'>
					        		<FontIcon className="material-icons centerVertical" style={{fontSize:'48px', color:'grey'}} >map</FontIcon>
					        	</div>
					        	<div className='column32 noBlur'>
					        		<div className="location centerVertical">{studyGroup.location}</div>
					        	</div>
					        </div>
					        <div className='row4'>
					        	<div className='column11'>

					        	</div>
					        	<div className='column42 noBlur'>
					        		<div className="host centerVertical">@{studyGroup.host}</div>
					        	</div>
					        	<div className='column43 noBlur'>
					        		<div className='centerVertical alignRight'>
					        			<RaisedButton onClick={this.joinLeaveGroup.bind(this, {joinText})} label={joinText} disabled={disabled}/>
					        		</div>
					        	</div>
					        	<div className='column44 noBlur'>
					        		<div className="capacity centerVertical">{studyGroup.guestlist}/{studyGroup.capacity}</div>
					        	</div>
					        </div>
					    </div>
			        </div>
		        </Paper>
	    	</div>
		)
	}
})

module.exports = MainGroupViewCard;