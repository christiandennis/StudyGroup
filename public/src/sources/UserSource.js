var UserActions = require('../actions/UserActions');
var axios = require('axios');

const userURL = 'https://sheetsu.com/apis/72092a94';
var mockData = [
	{id: 0, name: "Theo"},
	{id: 1, name: "Dennis"},
	{id: 2, name: "Dion"}
];

var UserSource = {
	fetchUser() {
		return {
		  remote(state) { 
		    return new Promise(function (resolve, reject) {
		      // simulate an asynchronous flow where data is fetched on
		      // a remote server somewhere.
		      axios.get(userURL)
			  	  .then(function (response) {
			  	  	//data = response from server
			  	  	var data = response.data;
			  	    resolve (data.result);
			  	  })
			  	  .catch(function (response) {
			  	    console.log(response);
			  	    reject ("GADAPET USER TOT");
		  	  });
		      
		    });
		  },

		  local() {
		    // Never check locally, always fetch remotely.
		    return null;
		  },

		  success: UserActions.updateUser,
		  error: UserActions.userFailed,
		  loading: UserActions.fetchUser
		}
	}
};

module.exports = UserSource;