const mongoose = require('mongoose').connect('mongodb://localhost:27017/todolist');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltFactor = 10;

const userSchema = new Schema({
	fbId : String,
	name : String,
	username : {
		type : String,
		required : true,
		index : { unique : true }
	},
	password : {
		type : String,
		required : true
	},
	email : {
		type : String,
		index : {
			unique : true
		}
	},
	task  : [{
		type: Schema.Types.ObjectId, ref: 'task',
	}],
	createdAt : {
		type : Date,
		default : Date.now()
	}
})

userSchema.pre('save', function(next) {
	var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(saltFactor, function(err, salt) {
    	if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
        	if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


const userModel = mongoose.model('user',userSchema);

module.exports = userModel
