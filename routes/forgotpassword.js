const express = require('express');

const resetpasswordController = require('../controllers/forgot_passwordController');


const router = express.Router();

router.post('/forgotpassword', resetpasswordController.forgotpassword)
router.get('/password/updatepassword/:resetpasswordid', resetpasswordController.updatepassword)
router.get('/password/resetpassword/:id', resetpasswordController.resetpassword)

module.exports = router;