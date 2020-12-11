const { Router } = require('express')
const auth = require('../middleware/auth')
const { signIn, signUp, recover, load, update, loadIncome, loadOutcome, logout } = require('../controllers/user.controller')
const router = new Router()

router.post('/api/user/signIn', signIn)

router.post('/api/user/signUp', signUp)

router.post('/api/user/recover', recover)

router.get('/api/user', auth, load)

router.put('/api/user', auth, update)

router.get('/api/user/loadIncome', auth, loadIncome)

router.get('/api/user/loadOutcome', auth, loadOutcome)

router.post('/api/user/logout', logout)

module.exports = router
