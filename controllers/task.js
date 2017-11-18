const mongoose = require('mongoose').connect('mongodb://localhost:27017/tasklist');
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
			err.message = "cant access task"
			res.send({err : err.message});
		}
	})
}



module.exports = {
	update
}