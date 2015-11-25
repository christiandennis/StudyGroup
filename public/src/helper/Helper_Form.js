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

exports.isValidDescription = function(description) {
	if (description) {
		if (description.length <= 256) {
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

exports.isValidLocation = function(location) {
	if (location) {
		if (location.length <= 30) {
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

exports.isValidCapacity = function(capacity, guestList) {
	if (capacity) {
		if (/^\d+$/.test(capacity)) {
			if (capacity < guestList) {
				return 'smallerThanGuest'
			} else if (capacity > 0) {
				return 'valid'
			} else {
				return 'lessThanZero'
			}
		} else {
			return 'notNumber'
		}	
	} else {
		return 'empty'
	}
	
};
