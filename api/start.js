const app = require('./server.js');
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true});

mongoClient.connect(function(err, client){
	if(err) return console.log(err);
	dbClient = client;
	app.locals.collection = client.db("usersdb").collection("users");
	app.listen(3000, function(){
		console.log("Server expects a connection...");
	});
});
