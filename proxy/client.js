const axios = require('axios');

axios.get('http://localhost:3001')
	.then(function (response) {
		//handle success
		console.log(response);
	})
	.catch(function (error) {
		//handle error
		console.log(error);
	})
	.finally(function () {
		//always executed
	});