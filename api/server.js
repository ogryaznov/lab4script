const mongoose = require("mongoose");
const express = require('express');
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const userScheme = new Schema({name: String, age: Number, height: Number, weight: Number}, {versionKey: false});
const User = mongoose.model("User", userScheme);
app.use(express.static(__dirname + "/public"));


app.get("/api/users", function(req, res){
	
	User.find({}, function(err, users){
		
		if(err) return console.log(err);
		res.send(users);
	});
});

app.get("/api/users/:id", function(req, res){
	
	const id = req.params.id;
	User.findOne({_id: id}, function(err, user){
		
		if(err) return console.log(err);
		res.send(user);
	});
});

app.post("/api/users", jsonParser, function (req, res){
	
	if(!req.body) return res.sendStatus(400);
	
	const userName = req.body.name;
	const userAge = req.body.age;
	const userHeight = req.body.height;
	const userWeight = req.body.weight;
	const user = new User({name: userName, age: userAge, height: userHeight, weight: userWeight});
	
	user.save(function(err){
		if(err) return console.log(err);
		res.send(user);
	});
});

app.delete("/api/users/:id", function(req, res){
	
	const id = req.params.id;
	User.findByIdAndDelete(id, function(err, user){
		
		if(err) return console.log(err);
		res.send(user);
	});
});

app.put("/api/users", jsonParser, function(req, res){
	
	if(!req.body) return res.sendStatus(400);
	const id = req.body.id;
	const userName = req.body.name;
	const userAge = req.body.age;
	const userHeight = req.body.height;
	const userWeight = req.body.weight;
	const newUser = {name: userName, age: userAge, height: userHeight, weight: userWeight};
	User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
		if(err) return console.log(err);
		res.send(user);
	});
});

module.exports = app;