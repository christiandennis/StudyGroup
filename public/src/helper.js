const moment = require('moment');


var exports = module.exports ={};

exports.calculateTimeEpoch = function(time, date) {
		date_str = date.toString().slice(0,15);
		time_str = time.toString().slice(15);
		return moment(date_str + time_str).unix();
};

exports.calculateTime = function(time, date) {
		date_str = date.toString().slice(0,15);
		time_str = time.toString().slice(15);
		return date_str + time_str
};

exports.isValidSubject = function(subject) {
		if (subject) {
			if (subject.length <= 10) {
				return 'valid';
			}
			else {
				return 'toomuch';
			}
		}
		else {
			return 'empty'
		}		
};

exports.isValidTitle = function(title) {
		if (title) {
			if (title.length <= 30) {
				return 'valid';
			}
			else {
				return 'toomuch';
			}
		}
		else {
			return 'empty'
		}		
};


exports.validateGroupDateTime = function(time, date) {
		if (time && date) {
			var time_epoch = exports.calculateTimeEpoch(time, date);
			var time_now = new Date().getTime() / 1000;
			if (time_epoch > time_now){
				return true;
			} else {
				return false;
			}
		}
	};
exports.test = function (a,b) {
	console.log("a");
	console.log("b");
}
