const app = require('./server.js');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/usersdb", function(err){
		if(err) return console.log(err);
		app.listen(3000, function(){
			console.log("Сервер очікує підключення...");
		});
});
