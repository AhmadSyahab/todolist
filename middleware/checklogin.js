const jwt = require('jsonwebtoken');
require('dotenv').config()

function isSignIn(req,res,next) {
	jwt.verify(req.headers.token , process.env.SECRET_KEY , function(err, decoded) {
		if(err || req.params.userId != decoded.id){
			res.send({message : "not authorized"})
		}else{
			req.headers.id = decoded.id
			req.headers.username = decoded.username
			req.headers.email = decoded.email
			next()	
		}
	});

// invalid token - synchronous
}

module.exports ={
	isSignIn
}