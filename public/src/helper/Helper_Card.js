const moment = require('moment');
var exports = module.exports ={};

exports.calculateTimeColor = function (card_date) {
	var card_epoch = moment(card_date).unix();
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
};

exports.checkUserGoing = function(studyGroup, user) {
	for (var i in studyGroup.users) {
     	if (studyGroup.users[i].id === user.id) {
       		return true;
     	}
   	}
   	return false;
};

exports.getJoinText = function(studyGroup, user) {
	if (studyGroup.host === user.nickname) {
		return 'Dismiss';
	} else if(exports.checkUserGoing(studyGroup, user)) {
		return 'Leave';
	} else if (studyGroup.guestlist === studyGroup.capacity) {
		return 'Full';
	} else {
		return 'Join';
	}
};

exports.checkDisabled = function(studyGroup) {
		return (new Date(studyGroup.date) < new Date());
};

exports.getTimeString = function(time) {
		// var d = new Date(0);
		// d.setUTCSeconds(Number(time));
		return moment(time).format("h:mm a").toString();
};

exports.getDateString = function(date) {
		// var d = new Date(0);
		// d.setUTCSeconds(Number(date));
		return moment(date).format("ddd, MMM D").toString();
};