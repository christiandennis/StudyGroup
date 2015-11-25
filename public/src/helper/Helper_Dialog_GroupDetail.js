const moment = require('moment');
var exports = module.exports ={};

exports.getTimeString = function(time) {
	return moment(time).format("h:mm a").toString();
};

exports.getDateString = function(date) {
	return moment(date).format("ddd, MMM D").toString();
};


