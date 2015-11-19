// React, react-reouter, alt
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router');
var History = Router.History;
var StudyGroupStore = require('../stores/StudyGroupStore');

// import components
var Dialog_GroupDetail = require('./Dialog_GroupDetail.jsx');

// Matertial UI components
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const RaisedButton = require('material-ui/lib/raised-button');
const Paper = require('material-ui/lib/paper');

const moment = require('moment');

var MainGroupViewCard = React.createClass({
	mixins: [History],

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
		} else {
			return 'colorBarRed';
		}
	},

	joinLeaveGroup(joinOrLeave) {
		// some logic to determine whether to join or to leave
		if (joinOrLeave === 'Dismiss') {
			console.log('TO DO: delete group');
		} else if (joinOrLeave === 'Leave') {
			StudyGroupStore.joinOrLeaveGroup(this.props.studyGroup.id, 'remove');
		} else {
			StudyGroupStore.joinOrLeaveGroup(this.props.studyGroup.id, 'add');
		}
	},

	render() {
		var studyGroup = this.props.studyGroup;
		var user = this.props.user;
		var d = new Date(0);
		d.setUTCSeconds(Number(studyGroup.date));
		var date = moment(d).format("ddd, MMM D").toString();
		var time = moment(d).format("h:mm a").toString();
		var color = this.calculateTimeColor(studyGroup.date);
		
		// determine if user is host, can join, or can leave		
		var joinText = 'Join';
		// if (studyGroup.host === user.nickname) {
		// 	joinText = 'Dismiss';
		// } else if(user.nickname in studyGroup.going) {
		// 	joinText = 'Leave';
		// }

		return (
			<div key={studyGroup.id}>
				<Dialog_GroupDetail ref='groupDetailDialog' studyGroup={studyGroup} user={user}/>

		        <Paper zDepth={3} className="card-container">
			        <div className="card studyGroup">
			            <div className={color}></div>
			            <table>
			                <tr className="row1">
			                    <td className="userPhotoHolder">
			                        <div className="photoHolder">
			                            <div className="circle">
			                                <img className="userPhoto" src="http://nick.mtvnimages.com/nick/properties/spongebob-squarepants/characters/spongebob-about-web-desktop.jpg?quality=0.75" />
			                            </div>
			                        </div>

			                    </td>
			                    <td colSpan="2">
			                        <span className="subject">{studyGroup.subject}</span>
			                        <span className="title">{studyGroup.title}</span>
			                    </td>

			                    <td colSpan="2" align="right" className="dateTimeHolder">
			                        <div className="date">{date}</div>
			                        <div className="time">{time}</div>
			                    </td>
			                </tr>

			                <tr className="row2">
			                    <td className="exclamationHolder">
			                        <div className="exclamation"></div>
			                    </td>
			                    <td colSpan="3">
			                        <div className="description">{studyGroup.description}</div>
			                        <div className="seeMore" onClick={this.openGroupDetailDialog} >See more...</div>
			                    </td>
			                </tr>

			                <tr className="row3">
			                    <td className="pinHolder">
			                        <div className="pin"></div>
			                    </td>
			                    <td colSpan="2">
			                        <div className="location">{studyGroup.location}</div>
			                    </td>
			                </tr>

			                <tr className="row4">
			                    <td></td>
			                    <td colSpan="1"><span className="host">@{studyGroup.host}</span>
			                    </td>
			                    <td colSpan="2">
			                        <div style={{textAlign:"right"}} className="joinButtonContainer">
			                            <RaisedButton onClick={this.joinLeaveGroup} label={joinText}/>
			                        </div>
			                    </td>
			                    <td>
			                        <div className="capacityHolder">
			                            <div className="capacity">{studyGroup.guestlist}/{studyGroup.capacity}</div>
			                        </div>
			                    </td>
			                </tr>
			            </table>
			        </div>
		        </Paper>
	    	</div>
		)
	}
})

module.exports = MainGroupViewCard;