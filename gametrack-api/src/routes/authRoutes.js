const express = require('express');

const { sendVerificationEmail, sendResetPasswordEmail } = require('../services/emailService')
const {register, login, verifyEmail, forgotPassword, resetPassword, resendVerification} = require('../controllers/authController')

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get(
    '/verify-email',
    verifyEmail
)
router.post(
    '/forgot-password',
    forgotPassword)
router.post(
    '/reset-password',
    resetPassword)
router.post(
    '/resend-verification',
    resendVerification
)

module.exports = router;