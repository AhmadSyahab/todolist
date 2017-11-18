const mongoose = require('mongoose').connect('mongodb://localhost:27017/todolist');
const User = require('../models/user');
const Task = require('../models/task');
const ObjectId = require('mongodb').ObjectId


function update(req,res) {
	Task.findOne({
		_id : req.params.taskId,
		userId : req.params.userId
	}, (err, task) => {
		if(task){
			task.set({
				userId : task.userId,
				taskname : req.body.taskname || task.taskname,
				tags : req.body.tags || task.tags,
				status : task.status,
				createdAt : task.createdAt,
				finishDate : task.finishDate
			})
			task.save((err, updatedTask) => {
				if(err){
					res.status(500).send(err);
				}else{
					res.send(updatedTask);
				}
			})
		}else{
			res.status(500).send({err : "no authorized or you dont have this task"});
		}
	})
}

function remove(req,res) {
	Task.remove({
		_id : req.params.taskId,
		userId : req.params.userId
	}, (err, task) => {
		if(err){
			res.status(500).send(err)
		}else{
			res.send(task)
		}
	})
}

function done(req,res) {
	Task.findOne({
		_id : req.params.taskId,
		userId : req.params.userId
	}, (err, task) => {
		if(task){
			task.set({
				userId : task.userId,
				taskname : task.taskname,
				tags : task.tags,
				status : true,
				createdAt : task.createdAt,
				finishDate : Date.now()				
			})
			task.save((err, updatedTask) => {
				if(err){
					res.status(500).send(err);
				}else{
					res.send(updatedTask);
				}				
			})
		}else{
			res.status(500).send(err)
		}
	})	
}

function unDone(req,res) {
	Task.findOne({
		_id : req.params.taskId,
		userId : req.params.userId
	}, (err, task) => {
		if(task){
			task.set({
				userId : task.userId,
				taskname : task.taskname,
				tags : task.tags,
				status : false,
				createdAt : task.createdAt,
				finishDate : null				
			})
			task.save((err, updatedTask) => {
				if(err){
					res.status(500).send(err);
				}else{
					res.send(updatedTask);
				}				
			})
		}else{
			res.status(500).send(err)
		}
	})	
}

module.exports = {
	update,
	remove,
	done,
	unDone
}