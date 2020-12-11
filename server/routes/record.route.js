const { Router } = require('express')
const auth = require('../middleware/auth')
const { create, load, loadById, remove, update } = require('../controllers/record.controller')
const router = new Router()

router.post('/api/record', auth, create)

router.get('/api/record', auth, load)

router.get('/api/record/:id', auth, loadById)

router.put('/api/record', auth, update)

router.delete('/api/record/:id', auth, remove)

module.exports = router
