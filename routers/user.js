const router = require('express').Router();
const ControllerUser = require('../controllers/user');
const ControllerTask = require('../controllers/task')
const Middleware = require('../middleware/checklogin')

router.post('/signup', ControllerUser.signUp ); // SignUp
router.post('/signIn', ControllerUser.signIn ); // SignIn
router.get('/:userId', Middleware.isSignIn , ControllerUser.findAll); // get user id list
router.post('/:userId', Middleware.isSignIn, ControllerUser.create); // create task


router.put('/:userId/task/:taskId', Middleware.isSignIn, ControllerTask.update) // update task
router.delete('/:userId/delete/:taskId',Middleware.isSignIn, ControllerTask.remove) // delete task
router.post('/:userId/done/:taskId', Middleware.isSignIn, ControllerTask.done) // make status task true (done)
router.post('/:userId/undone/:taskId', Middleware.isSignIn, ControllerTask.unDone) // make status task false (notdone)


module.exports = router;