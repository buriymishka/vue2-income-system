const { Router } = require('express')
const { refresh } = require('../controllers/tokens.controller')
const router = new Router()

router.get('/api/tokens/refresh', refresh)

module.exports = router
