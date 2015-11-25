var exports = module.exports ={};

exports.validateFullName = function(fullname) {
	if (fullname!=''){
		return true;
	} else {
		return false;
	}
};

exports.validateUsername = function(username) {
	if (username!=''){
		return true;
	} else {
		return false;
	}
};

exports.validateSchool = function(username) {
	if (username!=''){
		return true;
	} else {
		return false;
	}
};

exports.validateEmail = function(email) {
	if (email!=''){
		var at = email.indexOf("@");
		if (at!=-1 && at===email.lastIndexOf("@")) {
			var dot = email.lastIndexOf(".");
			if (dot!=-1 && dot>at && dot!=email.length-1){
				return 'valid';
			} else {
				return 'invalid';
			}
		} else {
			return 'invalid';
		}
	} else {
		return 'empty';
	}
};

exports.validatePasswordMatch = function(filled, password, confirmPassword) {
	if (filled && password===confirmPassword) {
		if(password.length <= 8){
			return 'tooshort';
		}
		return 'good';
	} else if (filled) {
		if(password.length <= 8){
			return 'tooshort';
		} else {
			return 'nomatch';
		}
	} else {
		return 'empty';
	}
};


