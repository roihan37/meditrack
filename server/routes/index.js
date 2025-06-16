const express = require('express')
const Controller = require('../controllers/controller')
const { authentication } = require('../middleware/auth')
const router = express.Router()

router.post("/auth/signup", Controller.createAccount)
router.post("/auth/signin", Controller.loginAccount)
router.use(authentication)
router.get("/lab-results", Controller.findAllByUser)
router.post("/lab-results", Controller.addLabResult)
router.get("/user/profile", Controller.findOneUserLogin)


module.exports = router