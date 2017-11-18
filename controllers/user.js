const mongoose = require('mongoose').connect('mongodb://localhost:27017/todolist');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const Task = require('../models/task');
const ObjectId = require('mongodb').ObjectId

function signUp(req,res){
	let user = new User({
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		email : req.body.email,
		task  : [],
		createdAt : Date.now()})
	user.save((err,user) => {
		if(err){
			res.status(500).send({err : err.errmsg});
		}else{
			res.send(user);
		}
	})
}

function signIn(req,res){
	User.findOne({
		username : req.body.username
	},(err,result) => {  
		if (err){
			res.status(500).send({err : err.msg});
		}else
		bcrypt.compare(req.body.password, result.password, (err,result) => {
			res.send(result)			
		})
	})
}

function findAll(req,res) {
	User.find({
		_id : ObjectId(req.params.userId)
	}).populate('task').exec()
	.then(allTask => {
		console.log(allTask)
		res.send(allTask);
	})
	.catch(err => {
		res.status(500).send({err: err.errmsg})
	})
}

function create(req,res) {
	User.findOne({
		_id : ObjectId(req.params.userId)
	}).then(user => {
		let task = new Task({
			userId : req.params.userId,
			taskname : req.body.taskname,
			tags : req.body.tags,
			status : false,
			createdAt : Date.now(),
			finishDate : null
		})
		task.save((err, task) => {
			if(err){
				res.status(500).send({err : err.errmsg})
			}else{
				user.task.push(task)
				console.log(user)
				user.save()
				res.send(user);
			}
		})
	})
}

module.exports = {
	signUp,
	signIn,
	create,
	findAll
}