const { Router } = require('express')
const auth = require('../middleware/auth')
const { create, load, loadById, remove, update } = require('../controllers/record.controller')
const router = new Router()

router.post('/api/record/create', auth, create)

router.get('/api/record/load', auth, load)

router.get('/api/record/loadById/:id', auth, loadById)

router.put('/api/record/update', auth, update)

router.delete('/api/record/remove/:id', auth, remove)

module.exports = router
