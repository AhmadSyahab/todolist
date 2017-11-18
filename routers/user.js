const router = require('express').Router();
const ControllerUser = require('../controllers/user');
const ControllerTask = require('../controllers/task')

router.post('/signup', ControllerUser.signUp );
router.post('/signIn', ControllerUser.signIn );
router.get('/:userId', ControllerUser.findAll);
router.post('/:userId', ControllerUser.create);
router.put('/:userId/task/:taskId', ControllerTask.update)
// router.delete('/:userId/delete/:taskId', Controller.remove)


module.exports = router;