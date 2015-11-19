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
		var card_epoch = moment(card_date).unix();
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
		joinOrLeave = 'remove';
		StudyGroupStore.joinOrLeaveGroup(this.props.studyGroup.id, joinOrLeave);
	},

	render() {
		var studyGroup = this.props.studyGroup;
		var date = moment(studyGroup.date).format("ddd, MMM D").toString();
		var time = moment(studyGroup.date).format("h:mm a").toString();
		var color = this.calculateTimeColor(studyGroup.date);
		return (
			<div key={studyGroup.id}>
				<Dialog_GroupDetail ref='groupDetailDialog' studyGroup={studyGroup}/>

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
			                            <RaisedButton onClick={this.joinLeaveGroup} label="Join"/>
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