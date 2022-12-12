const express = require('express');
const objectId = require("mongodb").ObjectId;

const app = express();
const jsonParser = express.json();

let dbClient;

app.use(express.static(__dirname + "/public"));


app.get("/api/users", function(req, res){
	const collection = req.app.locals.collection;
	collection.find({}).toArray(function(err, users){
		
		if(err) return console.log(err);
		res.send(users)
	});
});
app.get("/api/users/:id", function(req, res){
	
	const id = new objectId(req.params.id);
	const collection = req.app.locals.collection;
	collection.findOne({_id: id}, function(err, user){
		
		if(err) return console.log(err);
		res.send(user);
	});
});

app.post("/api/users", jsonParser, function (req, res) {
	
	if(!req.body) return res.sendStatus(400);
	
	const userName = req.body.name;
	const userAge = req.body.age;
	const userHeight = req.body.height;
	const userWeight = req.body.weight;
	const user = {name: userName, age: userAge, height: userHeight, weight: userWeight};
	
	const collection = req.app.locals.collection;
	collection.insertOne(user, function(err, result){
		
		if(err) return console.log(err);
		res.send(user);
	});
});

app.delete("/api/users/:id", function(req, res){
	
	const id = new objectId(req.params.id);
	const collection = req.app.locals.collection;
	collection.findOneAndDelete({_id: id}, function(err, result){
		
		if(err) return console.log(err);
		let user = result.value;
		res.send(user);
	});
});

app.put("/api/users", jsonParser, function(req, res){
	
	if(!req.body) return res.sendStatus(400);
	const id = new objectId(req.body.id);
	const userName = req.body.name;
	const userAge = req.body.age;
	const userHeight = req.body.height;
	const userWeight = req.body.weight;
	
	const collection = req.app.locals.collection;
	collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName, height: userHeight, weight: userWeight}},
		{returnOriginal: false}, function(err, result){
			if(err) return console.log(err);
			const user = result.value;
			res.send(user);
		});
});

module.exports = app;