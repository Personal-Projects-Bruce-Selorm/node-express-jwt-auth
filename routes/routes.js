/**
 * base file for handling routes
 */

//Dependencies
const { Router } = require('express')
const controller = require('../controllers/controller')

const middleware  = require('../middlewares/authMiddleware')


//initilize router
const router = Router();


//http verb GET for home page

router.get('/', controller.home_get)
router.get('/login', controller.login_get)
router.get('/register', controller.register_get)
router.post('/login', controller.login_post)
router.post('/register', controller.register_post)
router.get('/logout',controller.logout)
router.get('/dashbord',middleware.auth, controller.dahbord)






//export router
module.exports = router;