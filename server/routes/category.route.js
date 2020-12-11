const { Router } = require('express')
const auth = require('../middleware/auth')
const { load, create, loadById, update, remove } = require('../controllers/category.controller')
const router = new Router()

router.post('/api/category', auth, create)

router.get('/api/category', auth, load)

router.get('/api/category/:id', auth, loadById)

router.put('/api/category', auth, update)

router.delete('/api/category/:id', auth, remove)

module.exports = router
